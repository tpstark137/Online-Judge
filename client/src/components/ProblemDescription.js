import React from "react";
import "./style.css"
import { useParams } from "react-router-dom";
import { getcode } from "../api/getCode";
import { useState, useEffect } from "react";



function ProblemDescription() {
	const params = useParams()
	const [Q, setQ] = useState('')
	useEffect(() => {

		getcode(params.uniquename).then((data) => {
			setQ(data.Q)
		})

	})


	return (
			<div className="problem grey rounded overflow-hidden">
				<ul
					className="nav nav-tabs" id="myTab" role="tablist"
				>
					<li className="nav-item" role="presentation">
						<button
							className="nav-link active"
							id="pills-home-tab"
							data-bs-toggle="pill"
							data-bs-target="#pills-home"
							type="button"
							role="tab"
							aria-controls="pills-home"
							aria-selected="true"
						>
							<i className="fa-solid fa-code me-2" />
							Description
						</button>
					</li>
					
				</ul>
				<div className="tab-content" id="pills-tabContent">
					<div
						className="tab-pane fade show active p-3 hh"
						id="pills-home"
						role="tabpanel"
						aria-labelledby="pills-home-tab"
						tabIndex={0}
					>
						<div className="d-flex justify-content-between align-items-center">
							<h5>{Q ? Q.sequence + ". " + Q.title : null}</h5>

							{Q ? <h5 className=" fw-semibold" style={{ color: Q.difficulty === "Easy" ? 'green' : Q.difficulty === "Medium" ? '#F49D1A' : "red" }}>{Q ? Q.difficulty : null}</h5> : null}
						</div>
						<hr />
						< div id="desc">
							<div className="content" dangerouslySetInnerHTML={{ __html: Q.description }} />
							</div>
						</div>
						</div>
						
					</div>
	);
};
export default ProblemDescription;