import { Button } from '@material-ui/core'
import React, { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import { BACKEND } from '../../../config';
import CSS from 'csstype';

const actionButtons: CSS.Properties = {
	textAlign: 'right';
};

export function TableActions<T extends object>({
  instance,
	onSave,
	saveDataObject
}: PropsWithChildren<TableActions<T>>): ReactElement | null {
  const { columns } = instance;
	const [buttonClicked, setButtonClicked] = useState(false);

  const handleSave = useCallback(() => {
		setButtonClicked(true);

		let deleteEndpoint = saveDataObject.deleteEndpoint;
		let postEndpoint = saveDataObject.postEndpoint;

		if (saveDataObject.name === 'all') {
		fetch(`${BACKEND.ADDRESS}${deleteEndpoint}`, {
			method: 'DELETE',
			body: JSON.stringify({
				"training_id": saveDataObject.id
			}),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
			}).then(() => {
				Promise.all(instance.selectedFlatRows.map(element => fetch(`${BACKEND.ADDRESS}${postEndpoint}`, {
					method: 'POST',
					body: JSON.stringify({
						"account_id": element.original.id, 
						"account_trainingplan_id": element.original.account_trainingplan_id, 
						"training_id": saveDataObject.id
      		}),
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				})
			))
		})
		} else if (saveDataObject.name === 'finished') {
			fetch(`${BACKEND.ADDRESS}${deleteEndpoint}`, {
				method: 'DELETE',
				body: JSON.stringify({
					"training_id": saveDataObject.id
				}),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
				}).then(() => {
					Promise.all(instance.selectedFlatRows.map(element => fetch(`${BACKEND.ADDRESS}${postEndpoint}`, {
						method: 'PUT',
						body: JSON.stringify({
							"account_id": element.original.id,
							"training_id": saveDataObject.id,
							"present": true,
							"fulfilled": element.original.fulfilled
						}),
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include'
					})
				))
			})
		} 
  }, [])

  return (
      <div style={actionButtons}>
        {onSave && (
          <Button
            instance={instance}
            icon={<SaveIcon />}
            onClick={handleSave}
            label='Add'
            variant="contained" 
						color="primary"
          >Zapisz</Button>
        )}
      </div>
  )
}
