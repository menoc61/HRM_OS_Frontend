import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Typography,
} from "antd";

import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { clearProject, loadAllProject, updateProject } from "../../redux/rtk/features/projectManagement/project/project/project";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import { loadSingleProject } from "../../redux/rtk/features/projectManagement/project/project/project";
import PageTitle from "../page-header/PageHeader";
import Loader from "../loader/loader";
import moment from "moment";

const UpdateProject = ({ drawer }) => {
	const projectId = useParams("id").projectId;
	const [loader, setLoader] = useState(false);
	const userList = useSelector((state) => state.users.list);
	const { loading, project } = useSelector((state) => state.project);
	const [initialState, setInitialState] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(loadSingleProject(projectId));
		dispatch(loadAllStaff({ status: "true" }));
        return () => {
            dispatch(clearProject());
        }
	}, []);

    
	useEffect(() => {
		if (project) {
			setInitialState({
				...project,
				startDate: moment(project.startDate),
				endDate: moment(project.endDate),
			});
		}
	}, [project]);

	const { Title } = Typography;
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		const projectData = {
			...values,
			startDate: dayjs(values.startDate).format(),
			endDate: dayjs(values.endDate).format(),
		};

		setLoader(true);
		const resp = await dispatch(updateProject({id: projectId, values: projectData}));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
            dispatch(loadAllProject());
            navigate(-1);
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Project");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
			<PageTitle title={"Retour"} />
			<Row className='mr-top' justify={drawer ? "center" : "center"}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={drawer ? 22 : 18}
					xl={drawer ? 22 : 16}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
                    Mettre à jour le projet
					</Title>
                    { initialState ? (
                        <Form
                            form={form}
                            style={{ marginBottom: "40px" }}
                            eventKey='shift-form'
                            name='basic'
                            initialValues={initialState}
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 12,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete='off'>
                            <div>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label='Chef de projet'
                                    name='projectManagerId'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Selectionnez Chef de projet",
                                        },
                                    ]}>
                                    <Select
                                        loading={!userList.length}
                                        mode='single'
                                        showSearch
                                        placeholder='Selectionnez Chef de projet'
                                        optionFilterProp='children'>
                                        {userList.map((item) => (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.firstName} {item.lastName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label='Nom du Projet'
                                    name='name'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Entrez le Nom du Projet",
                                        },
                                    ]}>
                                    <Input placeholder='Entrez le Nom du Projet' />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label='Date de debut'
                                    name='startDate'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Veuillez saisir la date de début du projet !",
                                        },
                                    ]}>
                                    <DatePicker />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "20px" }}
                                    label='Date de fin'
                                    name='endDate'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Veuillez saisir la date de fin du projet !",
                                        },
                                    ]}>
                                    <DatePicker />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "20px" }}
                                    label='Description du projet'
                                    name='description'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Entrez la description du projet",
                                        },
                                    ]}>
                                    <Input.TextArea placeholder='Entrez la description du projet' />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    wrapperCol={{
                                        offset: 8,
                                        span: 12,
                                    }}>
                                    <Button
                                        onClick={() => setLoader(true)}
                                        type='primary'
                                        size='large'
                                        htmlType='submit'
                                        block
                                        loading={loader}>
                                        Mettre à jour le projet
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    ) : (
                        <Loader />
                    )}
				</Col>
			</Row>
			{/* </UserPrivateComponent> */}
		</Fragment>
	);
};

export default UpdateProject;
