import React, { useState, useEffect } from 'react';
import Swimmer from '../../assets/swimmer.gif';
import { BACKEND } from '../../config';
import { Button } from 'react-bootstrap';

function Badge(props){
	const [dataBadgeInfo, setDataBadgeInfo] = useState();
	const [dataBadgeResult, setDataBadgeResult] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isBadgeLoading, setBadgeIsLoading] = useState(false);

	const styles = {
			parent: {
					padding: '3%',
					borderStyle: 'solid',
					backgroundColor: 'white',
					whiteSpace: 'nowrap'
			},
			button: {
				  position: 'absolute',
					right: '30px'
			},
			child: {
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
							setDataBadgeInfo(data);
							resolve();
					})
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
			}); 
    }

		function markAndAddExperience(mid, mtitle, mamount){
			function markAsClaimed(id){
			console.log('%cBadge.js line:69 id', 'color: #007acc;', id);
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
			console.log(title + " " + amount);
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

    if(isLoading) return (
        <div className="d-flex justify-content-center">
            <img src={Swimmer} width="500" height="600"/>
        </div>
    );

		let badges = dataBadgeInfo.badge.map((d, i) => 
			<div style={styles.parent}>
			<p style={styles.child}>{dataBadgeInfo.badge[i].title} -<br/> {dataBadgeInfo.badge[i].description}<br/>
			{dataBadgeResult.badge.result > dataBadgeInfo.badge[i].condition ? 'true' : 'false'}
			</p>
			<Button 
				disabled={dataBadgeInfo.badge[i].claimed === true || (dataBadgeResult.badge.result > dataBadgeInfo.badge[i].condition ? true : false) === false} 
				style={styles.button} 
				variant="success"
				onClick={() => { 
					markAndAddExperience(dataBadgeInfo.badge[i].id, (dataBadgeInfo.badge[i].title + ' - ' + dataBadgeInfo.badge[i].description), dataBadgeInfo.badge[i].exppoints) }}
				>
				Zgarnij {dataBadgeInfo.badge[i].exppoints} expa
			</Button>
		</div>)      

		return (
					<div>
						{badges}
						<br/>
					</div>
			);
}

export default Badge