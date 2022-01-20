import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline, IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import ChangeBw from "./ChangeBw";
import axios from "axios";
import moment from "moment"


function BwListe(props) {

    const [bwListe, setBwListe] = useState([])
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [checkedId, setCheckedId] = useState("")

    useEffect(async () => {
        await axios
            .get(
                'http://localhost:5000/api/v1/bewerbungen/all?page=' + page,
                {
                    header: {
                        ContentType: 'application/json'
                    }
                }
            )
            .then(res => setBwListe(res.data))
        await axios
            .get(
                'http://localhost:5000/api/v1/bewerbungen/pages',
                {
                    header: {
                        ContentType: 'application/json'
                    }
                }
            )
            .then(res => setPages(res.data.pages))
    })

    useEffect(async () => {
        await axios
            .get(
                'http://localhost:5000/api/v1/bewerbungen/all?page=' + page,
                {
                    header: {
                        ContentType: 'application/json'
                    }
                }
            )
            .then(res => setBwListe(res.data))
        setCheckedId("")
    }, [page])

    useEffect(async () => {
        if (bwListe == {}) {
            await axios
                .get(
                    'http://localhost:5000/api/v1/bewerbungen/all?page=' + page,
                    {
                        header: {
                            ContentType: 'application/json'
                        }
                    }
                )
                .then(res => setBwListe(res.data))
            setCheckedId("")
        }
    }, [bwListe])

    useEffect(() => {
        const chkarray = document.getElementsByClassName("checker")
        for (let e of chkarray) {
            if (e.id != checkedId) {
                e.checked = false
            }
        }
    }, [checkedId])

    function deterMine(color) {
        color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

        var r = color >> 16;
        var g = (color >> 8) & 255;
        var b = color & 255;
        var hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
        if (hsp > 127.5) {
            return true;
        } else {
            return false;
        }
    }

    async function deleteHandler(e) {
        const id = e.target.id
        console.log(id);
        await axios.post(
            'http://localhost:5000/api/v1/bewerbungen/delete',
            { id: id },
            {
                header: {
                    ContentType: 'application/json'
                }
            }
        )
        setCheckedId("")
        setOpen(false)
    }

    function chkHandler(e) {
        if (e.target.checked) {
            setCheckedId(e.target.id)
        } else {
            setCheckedId("")
        }
    }

    function makeItem(x) {
        var itemC = deterMine(x.color1) ? "#000000" : "#ffffff"
        var border = "2px outset " + x.color2
        return (
            <div class="bwZeile">
                <div className="bwSpalte0" style={{ backgroundColor: x.color1, color: itemC, border: border }}><input id={x._id} class="checker" type="checkbox" onChange={chkHandler} /></div>
                <div className="bwSpalte1" style={{ backgroundColor: x.color1, color: itemC, border: border }}>{moment(x.datum).locale('de').format('DD.MMMM YYYY')}</div>
                <div className="bwSpalte2" style={{ backgroundColor: x.color1, color: itemC, border: border }}>{x.compName}</div>
                <div className="bwSpalte3" style={{ backgroundColor: x.color1, color: itemC, border: border }}>{x.compStreet}</div>
                <div className="bwSpalte4" style={{ backgroundColor: x.color1, color: itemC, border: border }}>{x.compTown}</div>
                <div className="bwSpalte5" style={{ backgroundColor: x.color1, color: itemC, border: border }}><input type="checkbox" checked={x.beworben} disabled /></div>
                <div className="bwSpalte6" style={{ backgroundColor: x.color1, color: itemC, border: border }}>{x.status}</div>
                <div className="bwSpalte7" style={{ backgroundColor: x.color1, color: itemC, border: border }} title={x.anmerkungen}>{x.anmerkungen != "" ? (x.anmerkungen.length > 15 ? x.anmerkungen.slice(0, 15) + "..." : x.anmerkungen) : "keine"}</div>
                <div className="bwSpalte8" id={x._id} style={{ backgroundColor: x.color1, color: itemC, border: border }} onClick={deleteHandler}><IoMdCloseCircleOutline style={{ pointerEvents: "none" }} /></div>
            </div>
        )
    }

    function lastPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    function nextPage() {
        if (page < pages) {
            setPage(page + 1)
        }
    }

    function wheelHandler(e) {
        if (e.deltaY === 100) {
            nextPage()
        }
        if (e.deltaY === -100) {
            lastPage()
        }
    }

    async function bwListeHandler() {
        setOpen(false)
    }

    return (
        <div>
            <div class="container2" onWheel={wheelHandler}>
                <div className="paginatorBw">
                    {page > 1 && <div onClick={lastPage}><IoIosArrowBack /></div>}
                    {pages > 1 && <div>{page}</div>}
                    {page < pages && <div onClick={nextPage}><IoIosArrowForward /></div>}
                </div>
                <div class="bwZeile">
                    <div className="bwSpalte0" style={{ backgroundColor: "rgba(0,0,0,0)", color: "#ffffff", border: "2px outset rgba(0,0,0,0)", boxShadow: "none" }}></div>
                    <div className="bwSpalte1" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Datum</div>
                    <div className="bwSpalte2" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Firmenname</div>
                    <div className="bwSpalte3" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Straße</div>
                    <div className="bwSpalte4" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Stadt</div>
                    <div className="bwSpalte5" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Beworben?</div>
                    <div className="bwSpalte6" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Status</div>
                    <div className="bwSpalte7" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Anmerkungen</div>
                    <div className="bwSpalte8" style={{ backgroundColor: "rgba(255, 0, 0, 0.267)", color: "#ffffff", border: "2px outset rgb(255, 149, 123)" }}>Löschen</div>
                </div>
                {bwListe && bwListe.map(makeItem)}
            </div>
            {checkedId != "" &&
                <div className="container3">
                    <ChangeBw id={checkedId} handler={bwListeHandler} />
                </div>
            }
        </div>
    )
}

export default BwListe