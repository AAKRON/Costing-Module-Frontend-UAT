import { GET_LIST } from 'admin-on-rest';
import { AutocompleteInput, DisabledInput, Edit, LongTextInput, NumberInput, SimpleForm } from 'admin-on-rest/lib/mui';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import React from 'react';
import restClient from '../../restClient';
import ItemCostView from './ItemCostView';

const ItemTitle = ({record}) => {
	return <span>Item #{ record ? `${record.item_number}`: '' }</span>;
};


export class  ItemEdit extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					boxes: [],
					item_types: [],
			};
	}

	fetchBoxes = () => restClient(GET_LIST, 'box-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});
	fetchItemTypes = () => restClient(GET_LIST, 'item-type-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});
	
	fetchApiCall(){
		axios.all([this.fetchBoxes(), this.fetchItemTypes()])
				.then(axios.spread((box, item_type) => {
						const boxes = box.data.map(box => ({id: box.id, name: box.name}));
						const item_types = item_type.data.map(item_type => ({id: item_type.type_number, name: item_type.description}));
						this.setState({boxes, item_types});
				}));
	}
	
	componentWillMount() {
		this.fetchApiCall();
	}
	
	componentDidMount(){
		this.fetchApiCall();
	}

	render () {
			return(
				<Edit title={<ItemTitle />} {...this.props}>
		        <SimpleForm>
		            <DisabledInput source='id' />
		            <NumberInput source='item_number' />
		            <LongTextInput source='description' />
								<AutocompleteInput source='box_id' choices={this.state.boxes} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
								<AutocompleteInput source='item_type_id' choices={this.state.item_types} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
								<NumberInput source='ink_cost' label='Ink Cost($)' />
								<NumberInput source='number_of_pcs_per_box' label='Number Of PCS/Box' />
								<ItemCostView type='price'/>
								<ItemCostView type='inventory'/>

						</SimpleForm>
				</Edit>
			)
	}
}
