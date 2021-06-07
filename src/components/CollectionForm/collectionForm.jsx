import React from 'react';
import useCollectionForm from '../CustomHooks/useCollectionForm';

const CollectionForm = (props) => {

    const Submittal = () => {
        // props.getCollectionFlashcards()
        console.log(inputs.title)
    }

    const {inputs, handleChange, handleSubmit} = useCollectionForm(Submittal);

    return (
        <div className="collectionForm">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title of Collection</label>
                    <input className="form-control" type="text" name="title" onChange={handleChange} value={inputs.title}/>
                    <br/>
                    <button className="btn btn-sm btn-primary">Create Collection</button>
                </div>
            </form>
        </div>
    )
}

export default CollectionForm;