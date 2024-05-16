import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import ViewBtn from "../../Buttons/ViewBtn";

const SalaryHistoryTable = ({ list }) => {
	const columns = [
		{
			title: "Salaire",
			dataIndex: "salary",
			key: "salary",
		},
		{
			title: "Date de debut",
			dataIndex: "startDate",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.startDate - b.startDate,
			render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "N/A"),
		},
		{
			title: "Date de fin",
			dataIndex: "endDate",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.endDate - b.endDate,
			render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "N/A"),
		},
		{
			title: "Commentaire",
			dataIndex: "comment",
			key: "comment",
		},

		{
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/hr/staffs/${id}/`} />,
		},
	];
	return (
		<div className='m-10'>
			<Table columns={columns} dataSource={list} pagination />
		</div>
	);
};

export default SalaryHistoryTable;
