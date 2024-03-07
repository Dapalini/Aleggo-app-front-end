import React from 'react';
import _ from 'lodash';

function TableBody(props: any) {
	const renderCell = (item: any, column: any) => {
		if (column.content) {
			return column.content(item);
		}
		return _.get(item, column.path);
	};

	const createKey = (item: any, column: any) => {
		return item + column + Math.random();
	};

	const { data, columns } = props;

	return (
		<tbody>
			{data.map((item: any) => (
				<tr key={item._id}>
					{columns.map((column: any) => (
						<td key={createKey(item._id, column)}>
							{renderCell(item, column)}
						</td>
					))}
					<td />
				</tr>
			))}
		</tbody>
	);
}

export default TableBody;
