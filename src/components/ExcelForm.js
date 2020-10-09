import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { withAlert } from 'react-alert';
import Toggle from 'react-toggle';
import axios from 'axios';

import { Loading } from './Fragments/Loading';

export class ExcelForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "N/A",
            atvevoNeve: "",
            szallitasiCim: "",
            eredetiBizonylat: "",
            visszaruAjanlat: "",
            termekek: [],
            ugyintezo: "N/A",
            megjegyzes: "",

            ugyintezok: [],
            loading: true,
            resetToggle: false
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3200/api/users/").then(res => {
            this.setState({ ugyintezok: res.data });
        }).catch(err => {
            console.log(err);
            this.props.alert.error("Hiba az ügyintézők lekérésekor!");
        }).then(() => {
            this.setState({ loading: false })
        });
    }

    termekChanged = (e, index, attribute) => {
        let termekek = [].concat(this.state.termekek);

        switch(attribute) {
            case 0:
                termekek[index].cikkszam = e.target.value;
                break;
            case 1:
                termekek[index].megnevezes = e.target.value;
                break;
            case 2:
                termekek[index].mennyiseg = e.target.value;
                break;
            default:
                break;
        }

        this.setState({ termekek: termekek });
    }

    addTermek = (e) => {
        if (this.state.termekek.length === 10) {
            this.props.alert.error("A maximális termékszám 10!");
            return;
        }
        let termekek = [].concat(this.state.termekek);
        termekek.push({
            cikkszam: "",
            megnevezes: "",
            mennyiseg: 0
        });
        this.setState({ termekek: termekek });
    }

    deleteTermek = (e, index) => {
        let termekek = [].concat(this.state.termekek);
        termekek.splice(index, 1);
        this.setState({ termekek: termekek });
    }

    displayProducts = () => {
        return this.state.termekek.map((termek, index) => {
            return (
                <Form.Group key={index}>
                    <Form.Row>
                        <Col lg="2">
                            <Form.Label>Cikkszám</Form.Label>
                            <Form.Control placeholder="Cikkszám" value={termek.cikkszam} onChange={(e) => { this.termekChanged(e, index, 0) }} />
                        </Col>
                        <Col lg>
                            <Form.Label>Megnevezés</Form.Label>
                            <Form.Control placeholder="Megnevezés" value={termek.megnevezes} onChange={(e) => { this.termekChanged(e, index, 1) }} />
                        </Col>
                        <Col lg="2">
                            <Form.Label>Mennyiség</Form.Label>
                            <Form.Control type="number" value={termek.mennyiseg} onChange={(e) => { this.termekChanged(e, index, 2) }} />
                        </Col>
                        <Col lg="1" className="text-center mt-3" style={{alignSelf: 'flex-end'}}>
                            <Button variant="danger" onClick={(e) => { this.deleteTermek(e, index) }} >Törlés</Button>
                        </Col>
                    </Form.Row>
                </Form.Group>
            )
        });
    }

    displayUgyintezok = () => {
        return this.state.ugyintezok.map((ugyintezo, index) => {
            return (
                <option value={ugyintezo.id} key={index}>
                    {ugyintezo.name}
                </option>
            );
        });
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.type === "N/A") {
            this.props.alert.error("Típus nincs kiválasztva!");
            return;
        }
        if (this.state.ugyintezo === "N/A") {
            this.props.alert.error("Ügyintéző nincs kiválasztva!");
            return;
        }
        if (this.state.eredetiBizonylat.length === 0) {
            this.props.alert.error("Eredeti bizonylat nincs megadva!");
            return;
        }
        if (this.state.visszaruAjanlat.length === 0) {
            this.props.alert.error("Visszáru ajánlat nincs megadva!");
            return;
        }
        const data = {
            type: this.state.type,
            atvevoNeve: this.state.atvevoNeve,
            szallitasiCim: this.state.szallitasiCim,
            eredetiBizonylat: this.state.eredetiBizonylat,
            visszaruAjanlat: this.state.visszaruAjanlat,
            termekek: this.state.termekek,
            ugyintezo: this.state.ugyintezo,
            megjegyzes: this.state.megjegyzes,
        }

        axios.post('http://localhost:3200/api/atveteli/create', data, { responseType: 'arraybuffer' }).then(res => {
            console.log(res);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', res.headers.filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        if (this.state.resetToggle) {
            this.reset(0);
        }
    }

    reset = (isVisual) => {
        this.setState({
            type: "N/A",
            atvevoNeve: "",
            szallitasiCim: "",
            eredetiBizonylat: "",
            visszaruAjanlat: "",
            termekek: [],
            ugyintezo: "N/A",
            megjegyzes: "",
        });
        if (isVisual) {
            this.props.alert.success("Űrlap alaphelyzetbe állítva!");
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Loading message="Betöltés" />
                </div>
            );
        }

        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Form.Group>
                        <Form.Label className="milegreen-title h4">Elismervény Készítő</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Col lg>
                            <Toggle 
                            checked={this.state.resetToggle}
                            onChange={() => { this.setState({resetToggle: !this.state.resetToggle}) }} />
                            <Form.Label className="ml-2" style={{verticalAlign: "top"}}>Űrlap alaphelyzetbe állítása letöltés után</Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col lg>
                                <Form.Label className="h6 milegreen"><span className="text-danger">*</span>Típus</Form.Label>
                                <Form.Control as="select" value={this.state.type} onChange={(e) => { this.setState({type: e.target.value}) }}>
                                    <option value="N/A">N/A</option>
                                    <option value="Átvételi Elismervény">Átvételi Elismervény</option>
                                    <option value="Hiánypótlás">Hiánypótlás</option>
                                    <option value="Visszáru Elutasítás">Visszáru Elutasítás</option>
                                    <option value="Visszáru Bekérése">Visszáru Bekérése</option>
                                    <option value="Garanciális Csere">Garanciális Csere</option>
                                </Form.Control>
                            </Col>
                            <Col lg>
                                <Form.Label className="h6 milegreen"><span className="text-danger">*</span>Ügyintéző</Form.Label>
                                <Form.Control as="select" value={this.state.ugyintezo} onChange={(e) => { this.setState({ugyintezo: e.target.value}) }}>
                                    <option value="N/A">N/A</option>
                                    {this.displayUgyintezok()}
                                </Form.Control>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="h6 milegreen"><span className="text-danger">*</span>Eredeti Bizonylat</Form.Label>
                        <Form.Control type="input" placeholder="Eredeti Bizonylat" value={this.state.eredetiBizonylat} onChange={(e) => { this.setState({eredetiBizonylat: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="h6 milegreen"><span className="text-danger">*</span>Visszáru Ajánlat</Form.Label>
                        <Form.Control type="input" placeholder="Visszáru Ajánlat" value={this.state.visszaruAjanlat} onChange={(e) => { this.setState({visszaruAjanlat: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="h6 milegreen">Átvevő Neve</Form.Label>
                        <Form.Control type="input" placeholder="Átvevő Neve" value={this.state.atvevoNeve} onChange={(e) => { this.setState({atvevoNeve: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="h6 milegreen">Szállítási Cím</Form.Label>
                        <Form.Control type="input" placeholder="Szállítási Cím" value={this.state.szallitasiCim} onChange={(e) => { this.setState({szallitasiCim: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="h6 milegreen">Termékek</Form.Label>
                        <Form.Group className="px-4">
                            {this.displayProducts()}
                            <Form.Group>
                                <Form.Row>
                                    <Col lg={{span: '4', offset: '4'}}>
                                        <Button block variant="success" onClick={(e) => { this.addTermek(e) }}>Termék Hozzáadása</Button>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="h6 milegreen">Megjegyzés</Form.Label>
                        <Form.Control as="textarea" rows="5" style={{resize: 'none'}} value={this.state.megjegyzes} onChange={(e) => { this.setState({megjegyzes: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col lg="3"/>
                            <Col className="mt-3" lg="4">
                                <Button size="lg" type="submit" block variant="success">Excel Fájl Letöltése</Button>
                            </Col>
                            <Col className="mt-3" lg="2">
                                <Button size="lg" block variant="outline-danger" onClick={() => { this.reset(1) }}>Reset</Button>
                            </Col>
                            <Col lg="3"/>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default withAlert()(ExcelForm);