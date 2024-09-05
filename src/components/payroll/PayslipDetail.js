import { Col, Row, Image, Avatar, Typography, Divider, Button } from "antd";
import dayjs from "dayjs";
import React, {
	forwardRef,
	Fragment,
	useEffect,
	useRef,
	useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import getSetting from "../../api/getSettings";

import { useDispatch, useSelector } from "react-redux";
import {
	clearPayroll,
	loadSinglePayslip,
} from "../../redux/rtk/features/payroll/payrollSlice";
import { useParams } from "react-router-dom";
import PrintIconSVG from "../Icons/PrintIconSVG";
import tw from "tailwind-styled-components";
import Loader from "../loader/loader";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
	const { Title } = Typography;
	return (
		<Fragment>
			<div ref={ref} className='wrapper'>
				<Col className='container mx-auto px-4 my-20'>
					<Row justify='center'>
						<PrintIconSVG />
					</Row>
					<Row justify='center'>
						<h1 className='text-3xl font-semibold text-slate-600 mt-2 mb-8'>
						FICHE DE SALAIRE
						</h1>
					</Row>
					<Row>
						{/* show Avatar with url */}
						<Col span={6}>
							<TitleText>{invoiceData?.company_name.toUpperCase()}</TitleText>
							<TitleText2>{invoiceData?.email || "demo@demo.com"}</TitleText2>

							<TitleText2>{invoiceData?.phone}</TitleText2>
						</Col>

						<Col span={6}>
							<TitleText>
								{(data.user.firstName + " " + data.user.lastName).toUpperCase()}
							</TitleText>
							<TitleText2>{data.user.email || "demo@demo.com"}</TitleText2>
							<TitleText2>{data.user.phone || "+800777877787"}</TitleText2>
						</Col>

						<Col span={6}>
							<p>
								<TitleText>Salaire:</TitleText> {data.salary} Fcfa
							</p>
							<TitleText>Journée de travail: </TitleText> {data.workDay}
							<p>
								<TitleText>Heure de travail: </TitleText> {data.workingHour} Hours
							</p>
						</Col>
						<Col span={6}>
							<p>
								<TitleText>Créé à:</TitleText>{" "}
								{dayjs(data.salaryMonth, "M").format("MMMM")}, {data.salaryYear}
							</p>
							<p>
								<TitleText>Créé à:</TitleText>{" "}
								{dayjs(data.createdAt).format("DD/MM/YYYY")}
							</p>
							<p>
								<TitleText>Statut:</TitleText> {data.paymentStatus}
							</p>
						</Col>
					</Row>

					<Row style={{ marginTop: "5%" }} gutter={[100, 0]}>
						{/* Earnings */}

						<Col span={12}>
							<h2 className='text-xl font-semibold text-slate-600 mb-4'>
							Gains
							</h2>
							<Row>
								<Col span={12}>
									<Title level={5}>Salaire payable</Title>
								</Col>
								<Col
									span={12}
									style={{ display: "flex", justifyContent: "flex-end" }}>
									<Title level={5}>{data.salaryPayable} Fcfa </Title>
								</Col>
							</Row>
							<Row>
								<Col span={12}>
									<Title level={5}>Bonus : {data.bonusComment}</Title>
								</Col>
								<Col
									span={12}
									style={{ display: "flex", justifyContent: "flex-end" }}>
									<Title level={5}>{data.bonus} Fcfa</Title>
								</Col>
							</Row>

							<Divider></Divider>
							<Row>
								<Col span={12}>
									<Title level={4}>Total des gains</Title>
								</Col>
								<Col
									span={12}
									style={{ display: "flex", justifyContent: "flex-end" }}>
									<Title level={5}>{data.salaryPayable + data.bonus} Fcfa</Title>
								</Col>
							</Row>
						</Col>

						<Col span={12}>
							<h2 className='text-xl font-semibold text-slate-600 mb-4'>
								Deductions
							</h2>

							<Row>
								<Col span={12}>
									<Title level={5}>Deduction : {data.deductionComment}</Title>
								</Col>
								<Col
									span={12}
									style={{ display: "flex", justifyContent: "flex-end" }}>
									<Title level={5}>{data.deduction} Fcfa</Title>
								</Col>
							</Row>

							<Divider style={{ marginTop: "40px" }}></Divider>
							<Row>
								<Col span={12}>
									<Title level={4}>Total Deduction</Title>
								</Col>
								<Col
									span={12}
									style={{ display: "flex", justifyContent: "flex-end" }}>
									<Title level={5}>{data.deduction} Fcfa</Title>
								</Col>
							</Row>
						</Col>
					</Row>

					<div style={{ marginTop: "5%" }} className='flex justify-end'>
						<div>
							<Title level={4}>
							Total des gains : {data.salaryPayable + data.bonus}{" "} Fcfa
							</Title>
							<Title level={4}>Déduction totale : {data.deduction} Fcfa</Title>
							<Title level={3}>
							Salaire total payable : {data.totalPayable}{" "} Fcfa
							</Title>
						</div>
					</div>
				</Col>
			</div>
		</Fragment>
	);
});

const DetailPayslip = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const [invoiceData, setInvoiceData] = useState(null);
	useEffect(() => {
		getSetting().then((data) => setInvoiceData(data.result));
	}, []);

	const data = useSelector((state) => state.payroll?.payslip);
	const dispatch = useDispatch();
	const { id } = useParams("id");

	useEffect(() => {
		dispatch(loadSinglePayslip(id));

		return () => {
			dispatch(clearPayroll());
		};
	}, []);

	return (
		<div>
			<UserPrivateComponent permission={"readSingle-payroll"}>
				<div className=''>
					<div className='flex justify-end mr-10'>
						{invoiceData && (
							<Button type='primary' size='large' onClick={handlePrint}>
							Imprimer la fiche de paie
							</Button>
						)}
					</div>
					{data ? (
						<PrintToPdf
							ref={componentRef}
							data={data}
							invoiceData={invoiceData}
						/>
					) : (
						<Loader />
					)}
				</div>
			</UserPrivateComponent>
		</div>
	);
};

const TitleText = tw.span`
text-sm
font-semibold
text-slate-700

`;

const TitleText2 = tw.div`
text-sm
text-slate-600

`;
const TitleText3 = tw.span`
text-sm
text-slate-600

`;
export default DetailPayslip;
