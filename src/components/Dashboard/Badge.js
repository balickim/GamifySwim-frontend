import React, { useState, useEffect } from 'react';
import Swimmer from '../../assets/swimmer.gif';
import { BACKEND } from '../../config';
import { Button } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';

function Badge(props){
	const [dataBadgeInfo, setDataBadgeInfo] = useState();
	const [dataBadgeInfoMax, setDataBadgeInfoMax] = useState(0);
	const [dataBadgeResult, setDataBadgeResult] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isBadgeLoading, setBadgeIsLoading] = useState(false);
	const [shake, setShake] = useState(false);

	const styles = {
			parent: {
					padding: '3%',
					backgroundColor: 'white',
					whiteSpace: 'nowrap',
					marginBottom: '10px',
					boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
					display: 'flex',
					flexDirection: 'column',
					borderRadius: '15px 15px 15px 15px'
			},
			button: {
				  position: 'absolute',
					right: '30px'
			},
			child: {
				display:'inline-block'
			},
			progress: {
				whiteSpace: 'nowrap',
				display:'inline-block'
			}
	}

	useEffect(() => {
			Promise.all([fetchBadgeInfo(), fetchBadgeResult()]).then(() => {
				setIsLoading(false);
			});
	}, [])

	const fetchBadgeInfo = () => {
			const requestOptions = {
				method: 'POST',
				body: JSON.stringify({badge_id: props.id}),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			};
			return new Promise((resolve, reject) => {
				fetch(`${BACKEND.ADDRESS}/user/badge/info`, requestOptions)
					.then(response => response.json())
					.then(data => {
							// setDataBadgeInfoMax(data.badge[Object.keys(data.badge)[Object.keys(data.badge).length - 1]].condition);

							setDataBadgeInfo(data);

							resolve();
					})
					.catch(error => {
						console.error('Error:', error);
					});
			}); 
    }

		const fetchBadgeResult = () => {
			const requestOptions = {
				method: 'POST',
				body: JSON.stringify({badge_id: props.id}),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			};
			return new Promise((resolve, reject) => {
				fetch(`${BACKEND.ADDRESS}/user/badge/result`, requestOptions)
					.then(response => response.json())
					.then(data => {
							setDataBadgeResult(data);
							resolve();
					})
					.catch(error => {
						console.error('Error:', error);
					});
			}); 
    }

		function markAndAddExperience(mid, mtitle, mamount){
			document.getElementById(mid).disabled = true;
			document.getElementById(mid).innerHTML = 'Zgarnięto';
			animate()

			function markAsClaimed(id){
				const requestOptions = {
					method: 'POST',
					body: JSON.stringify({achievement_id: id}),
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				};
				return new Promise((resolve, reject) => {
					fetch(`${BACKEND.ADDRESS}/user/badge/claim`, requestOptions)
						.then(response => response.json())
						.then(() => {
								resolve();
						})
				}); 
			}

			function addExperienceEntry(title, amount){
				const requestOptions = {
					method: 'POST',
					body: JSON.stringify({title, amount}),
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				};
				return new Promise((resolve, reject) => {
					fetch(`${BACKEND.ADDRESS}/experience/experienceentry`, requestOptions)
						.then(response => response.json())
						.then(() => {
								resolve();
						})
				}); 
			}
			markAsClaimed(mid);
			addExperienceEntry(mtitle, mamount);
    }

		const animate = () => {
        setShake(true);
        setTimeout(() => setShake(false), 2000);
    };

    if(isLoading) return (
        <div className="d-flex justify-content-center">
            <img src={Swimmer} width="500" height="600"/>
        </div>
    );

		let badges = dataBadgeInfo.badge.map((d, i) => 
			<div style={styles.parent}>
			<p style={styles.child}><b>{dataBadgeInfo.badge[i].title}</b> <br/> {dataBadgeInfo.badge[i].description}
			</p>
				<Button
					key={dataBadgeInfo.badge[i].id}
					id={dataBadgeInfo.badge[i].id}
					disabled=
						{
						dataBadgeInfo.badge[i].claimed === true 
						|| 
						(dataBadgeResult.badge.result >= dataBadgeInfo.badge[i].condition ? true : false) === false} 
					style={styles.button} 
					variant="success"
					className = {shake ? 'shake' : null}
					onClick={() => { markAndAddExperience(dataBadgeInfo.badge[i].id, (dataBadgeInfo.badge[i].title + ' - ' + dataBadgeInfo.badge[i].description), dataBadgeInfo.badge[i].exppoints) }}
					>
					{dataBadgeInfo.badge[i].claimed ? 'Zgarnięto' : `Zgarnij ${dataBadgeInfo.badge[i].exppoints} expa` }
				</Button>
				<div style={styles.progress}><ProgressBar animated now={dataBadgeResult.badge.result} max={dataBadgeInfo.badge[i].condition} /></div>
		</div>)      

		return (
					<div>
						{badges}
						<br/>
					</div>
			);
}

export default Badge