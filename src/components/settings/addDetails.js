import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { toast } from "react-toastify";
import getSetting from "../../api/getSettings";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loader from "../loader/loader";
import styles from "./AddDetails.module.css";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//Update Invoice API REQ

const updateInvoice = async (values) => {
	try {
		await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `setting`,
			data: {
				...values,
			},
		});
		return "success";
		// return data;
	} catch (error) {
		console.log(error.message);
	}
};

const AddDetails = () => {
	const { Title } = Typography;
	const [loader, setLoader] = useState(false);

	const [form] = Form.useForm();

	const [initValues, setInitValues] = useState(null);

	const onFinish = async (values) => {
		try {
			const resp = await updateInvoice(values);
			if (resp === "success") {
				toast.success("Invoice Updated Successfully");
				setInitValues({});
				window.location.reload();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.error("Quelque chose s'est mal passé!");
		console.log("Failed:", errorInfo);
	};

	const onClickLoading = () => {
		setLoader(true);
	};
	useEffect(() => {
		getSetting().then((data) => setInitValues(data.result));
	}, []);

	return (
		<Fragment>
			<UserPrivateComponent permission={"create-setting"}>
				<Row className='mr-top' justify='center'>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={11}
						xl={11}
						className='border rounded column-design'>
						<Card bordered={false}>
							<Title level={4} className='m-2 mb-4 text-center'>
							Paramètres de l'entreprise
							</Title>
							{initValues ? (
								<Form
									initialValues={{
										...initValues,
									}}
									form={form}
									name='basic'
									labelCol={{
										span: 7,
									}}
									labelWrap
									wrapperCol={{
										span: 16,
									}}
									onFinish={onFinish}
									onFinishFailed={onFinishFailed}
									autoComplete='off'>
									<Form.Item
										style={{ marginBottom: "10px" }}
										fields={[{ name: "Company Name" }]}
										label='nom de l/entreprise'
										name='company_name'
										rules={[
											{
												required: true,
												message: "Veuillez saisir le nom de l'entreprise !",
											},
										]}>
										<Input />
									</Form.Item>
									<Form.Item
										style={{ marginBottom: "10px" }}
										fields={[{ name: "Tagline" }]}
										label='Slogan'
										name='tag_line'
										rules={[
											{
												required: true,
												message: "Veuillez saisir le slogan!",
											},
										]}>
										<Input />
									</Form.Item>

									<Form.Item
										style={{ marginBottom: "10px" }}
										label='Addresse'
										name='address'
										rules={[
											{
												required: true,
												message: "Veuillez saisir l'adresse!",
											},
										]}>
										<Input />
									</Form.Item>

									<Form.Item
										style={{ marginBottom: "10px" }}
										label='votre numéro de téléphone'
										name='phone'
										rules={[
											{
												required: true,
												message: "Veuillez saisir votre numéro de téléphone !",
											},
										]}>
										<Input />
									</Form.Item>

									<Form.Item
										style={{ marginBottom: "10px" }}
										label='Adresse E-mail'
										name='email'
										rules={[
											{
												required: true,
												message: "Veuillez saisir votre adresse e-mail !",
											},
										]}>
										<Input />
									</Form.Item>

									<Form.Item
										style={{ marginBottom: "10px" }}
										label='site Web'
										name='website'
										rules={[
											{
												required: true,
												message: "Veuillez saisir le site Web !",
											},
										]}>
										<Input />
									</Form.Item>

									<Form.Item
										style={{ marginBottom: "10px" }}
										label='Pied de page'
										name='footer'
										rules={[
											{
												required: true,
												message: "Veuillez saisir le pied de page!",
											},
										]}>
										<Input />
									</Form.Item>

									<Form.Item
										style={{ marginBottom: "10px" }}
										className={styles.addBtnContainer}>
										<Button
											type='primary'
											htmlType='submit'
											shape='round'
											size='large'
											loading={loader}
											onClick={onClickLoading}>
											Détails de la mise à jour
										</Button>
									</Form.Item>
								</Form>
							) : (
								<Loader />
							)}
						</Card>
					</Col>
				</Row>
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddDetails;
