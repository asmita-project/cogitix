import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactPaginate from "react-paginate";
import  "../../component/sidebar/sidepanel.css";

export default function Characters() {
    const params = useParams()
    const [Characters, setCharacter] = useState([])
    const [episodeName,setEpisodename]=useState('')

    //  *****************pagination variable*****************
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 19;

  const offset = currentPage * itemsPerPage;
  const startIndex = (currentPage) * itemsPerPage;
  const currentItems = Characters.slice(startIndex, startIndex + itemsPerPage);
  // ********************pagination fun****************
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
//   *************************end********************************

    useEffect(() => {
        if (params.id != null) {
            getallEpisodeByid()
        }
        else {
            getallCharacters()
        }

    }, [params.id])

    const getallCharacters = () => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then((res) => {
                setCharacter(res.data.results)
            }).catch((err) => {
                console.log("err", err)
            })
    }


    const getallEpisodeByid = () => {
        axios.get('https://rickandmortyapi.com/api/episode/' + params.id)
            .then((res) => {
                setEpisodename(res.data.name)
                let characterdata = res.data.characters
                let filterid = characterdata.map((item) => {
                    return item.substring(42, 45)

                })
                getmultiplecharacter(filterid)
            }).catch((err) => {
                console.log("err", err)
            })
    }

    const getmultiplecharacter = (items) => {
        let multipleId = items.toString()
        axios.get('https://rickandmortyapi.com/api/character/' + multipleId)
            .then((res) => {
                setCharacter(res.data)

            }).catch((err) => {
                console.log("err", err)
            })
    }

    return (
        <div>
            <div>
                {
                    params.id != null ?
                        <h3 style={{ textAlign: 'center' }}>{Characters.length} characters in episode {episodeName}</h3>
                        :
                        <h3 style={{ textAlign: 'center' }}>Rick And Morty Characters</h3>
                }

            </div>
            <div className="row">
                {
                    currentItems.map((items, ind) => (
                        <div className="col-sm-2" key={ind}>
                            <div className="childrenBox">
                                <div>
                                    <img src={items.image} alt="character" width="100%" />

                                </div>

                                <div style={{ textAlign: 'center' }}>{items.name}</div>
                            </div>

                        </div>
                    ))
                }
                 <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(Characters.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>

        </div>






    )
}

