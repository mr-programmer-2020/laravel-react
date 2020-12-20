import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const pgCntArray = [5, 10, 25, 50, 100];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",
            url: "/api/fetchData",
            pgCnt: 5,
            filter: [
                {
                    name: "artistName",
                    value: "all"
                },
                {
                    name: "genre",
                    value: "all"
                },
                {
                    name: "year",
                    value: "all"
                }
            ],
            sort: [
                {
                    name: "artistName",
                    value: 0
                },
                {
                    name: "musicName",
                    value: 0
                },
                {
                    name: "genre",
                    value: 0
                },
                {
                    name: "year",
                    value: 0
                }
            ]
        };
        this.getData = this.getData.bind(this);
        this.responsefunc = this.responsefunc.bind(this);
        this.getPage = this.getPage.bind(this);
        this.setPgCnt = this.setPgCnt.bind(this);
        this.setSort = this.setSort.bind(this);
        this.onChangeGenreFilter = this.onChangeGenreFilter.bind(this);
        this.onChangeArtistFilter = this.onChangeArtistFilter.bind(this);
        this.onChangeYearFilter = this.onChangeYearFilter.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        let responsefunc = this.responsefunc;

        axios
            .get(this.state.url, {
                params: {
                    pgCnt: this.state.pgCnt,
                    sort: this.state.sort,
                    filter: this.state.filter
                }
            })
            .then(function(response) {
                console.log(response.data);
                responsefunc(response);
            });
    }
    responsefunc(res) {
        this.setState({
            artist: res.data.artist
        });
    }
    getPage(url) {
        this.setState(
            {
                url: url
            },
            () => {
                this.getData();
            }
        );
    }
    setPgCnt(cnt) {
        this.setState(
            {
                pgCnt: cnt
            },
            () => {
                this.getData();
            }
        );
    }
    setSort(sortfield) {
        let sort = [...this.state.sort];
        let existingIndex = -1;
        let existItem = sort.find((item, index) => {
            if (item.name == sortfield) {
                existingIndex = index;
                return true;
            }
        });
        let val = existItem.value;
        val == 2 ? (val = 0) : (val = val + 1);

        //sort.splice(existingIndex,1)
        sort[existingIndex].value = val;
        /*
        sort.push({
            name:sortfield,
            value:val
        })
        */
        this.setState(
            {
                sort: sort
            },
            () => {
                this.getData();
            }
        );
    }
    onChangeGenreFilter(e) {
        this.setFilter("genre", e.target.value);
    }
    onChangeArtistFilter(e) {
        this.setFilter("artistName", e.target.value);
    }
    onChangeYearFilter(e) {
        this.setFilter("year", e.target.value);
    }
    setFilter(filterName, value) {
        let filter = [...this.state.filter];
        let existingIndex = -1;
        let existItem = filter.find((item, index) => {
            if (item.name == filterName) {
                existingIndex = index;
                return true;
            }
        });
        filter.splice(existingIndex, 1);
        filter.push({
            name: filterName,
            value: value
        });
        this.setState(
            {
                filter: filter
            },
            () => {
                this.getData();
            }
        );
    }
    render() {
        const { artist } = this.state;
        //console.log(artist)
        let { current_page, last_page } = artist;

        return (
            <div className="container">
                <div className="justify-content-center">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="Main-Table">
                                <div
                                    className="Main-Table-Header"
                                    style={{ backgroundColor: "#ecf0f1" }}
                                >
                                    <div
                                        className="Table-Row"
                                        style={{ margin: "10px 0px 10px 0px" }}
                                    >
                                        <div
                                            className={`Table-Item Header`}
                                            onClick={() =>
                                                this.setSort("artistName")
                                            }
                                            style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "spac"
                                            }}
                                        >
                                            <div>artistName</div>
                                            <div className="Header-Icon">
                                                {this.state.sort[0].value !=
                                                    0 && (
                                                    <>
                                                        {this.state.sort[0]
                                                            .value == 1 ? (
                                                            <i
                                                                className="fa fa-arrow-up ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-arrow-down ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`Table-Item Header`}
                                            onClick={() =>
                                                this.setSort("musicName")
                                            }
                                            style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "spac"
                                            }}
                                        >
                                            <div>Name</div>
                                            <div className="Header-Icon">
                                                {this.state.sort[1].value !=
                                                    0 && (
                                                    <>
                                                        {this.state.sort[1]
                                                            .value == 1 ? (
                                                            <i
                                                                className="fa fa-arrow-up ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-arrow-down ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`Table-Item Header`}
                                            onClick={() =>
                                                this.setSort("genre")
                                            }
                                            style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "spac"
                                            }}
                                        >
                                            <div>Genre</div>
                                            <div className="Header-Icon">
                                                {this.state.sort[2].value !=
                                                    0 && (
                                                    <>
                                                        {this.state.sort[2]
                                                            .value == 1 ? (
                                                            <i
                                                                className="fa fa-arrow-up ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-arrow-down ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`Table-Item Header`}
                                            onClick={() => this.setSort("year")}
                                            style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "spac"
                                            }}
                                        >
                                            <div>Year</div>
                                            <div className="Header-Icon">
                                                {this.state.sort[3].value !=
                                                    0 && (
                                                    <>
                                                        {this.state.sort[3]
                                                            .value == 1 ? (
                                                            <i
                                                                className="fa fa-arrow-up ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className="fa fa-arrow-down ml-1 mr-1"
                                                                aria-hidden="true"
                                                            ></i>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Main-Table-Content">
                                    {Array.isArray(artist.data) && (
                                        <>
                                            {artist.data.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="Table-Row justify-content-between border"
                                                    >
                                                        <div className="Table-Item">
                                                            {item.artistName}
                                                        </div>
                                                        <div className="Table-Item">
                                                            {item.musicName}
                                                        </div>
                                                        <div className="Table-Item">
                                                            {item.genre}
                                                        </div>
                                                        <div className="Table-Item">
                                                            {item.year}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                </div>
                                <div className="Main-Table-Pagination">
                                    <div className="row justify-content-center">
                                        <div className="paginationButtonPanel">
                                            {Array.isArray(artist.links) && (
                                                <>
                                                    {artist.links.map(
                                                        (item, index) => {
                                                            let classNameVal =
                                                                "m-1 btn circleBtn";
                                                            let label =
                                                                item.label;
                                                            if (
                                                                item.label ==
                                                                "&laquo; Previous"
                                                            )
                                                                label = "<";
                                                            if (
                                                                item.label ==
                                                                "Next &raquo;"
                                                            )
                                                                label = ">";

                                                            if (!item.url) {
                                                                classNameVal = `${classNameVal} disabled`;
                                                            }
                                                            if (
                                                                item.label ==
                                                                current_page
                                                            ) {
                                                                classNameVal = `${classNameVal} btn-select`;
                                                            }
                                                            return (
                                                                <div
                                                                    className={
                                                                        classNameVal
                                                                    }
                                                                    key={index}
                                                                    onClick={() =>
                                                                        this.getPage(
                                                                            item.url
                                                                        )
                                                                    }
                                                                >
                                                                    {label}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="paginationCntPanel row">
                                            {pgCntArray.map((item, index) => {
                                                let classNameVal =
                                                    "btn border btn-PgCnt";
                                                if (this.state.pgCnt == item) {
                                                    classNameVal = `${classNameVal} btn-select`;
                                                }
                                                return (
                                                    <div
                                                        className={classNameVal}
                                                        onClick={() =>
                                                            this.setPgCnt(item)
                                                        }
                                                    >
                                                        {item}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-md-4"
                            style={{ padding: "0px 20px 0px 20px" }}
                        >
                            <div className="FilterPan">
                                <div>
                                    <div className="FilterHeader">
                                        ArtistName
                                    </div>
                                    <select
                                        className="FilterSelect p-2"
                                        onChange={this.onChangeArtistFilter}
                                    >
                                        <option value={"all"}>All</option>
                                        <option value={"The Kingston Trio"}>
                                            The Kingston Trio
                                        </option>
                                        <option value={"Led Zeppelin"}>
                                            Led Zeppelin
                                        </option>
                                        <option value={"Miles Davis"}>
                                            Miles Davis
                                        </option>
                                        <option value={"Muddy Waters"}>
                                            Muddy Waters
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <div className="FilterHeader">Genre</div>
                                    <select
                                        className="FilterSelect p-2"
                                        onChange={this.onChangeGenreFilter}
                                    >
                                        <option value={"all"}>All</option>
                                        <option value={"Folk"}>Folk</option>
                                        <option value={"Rock"}>Rock</option>
                                        <option value={"Jazz"}>Jazz</option>
                                        <option value={"Blues"}>Blues</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="FilterHeader">Year</div>
                                    <select
                                        className="FilterSelect p-2"
                                        onChange={this.onChangeYearFilter}
                                    >
                                        <option value={"all"}>All</option>
                                        <option value={2018}>2018</option>
                                        <option value={2019}>2019</option>
                                        <option value={2020}>2020</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
