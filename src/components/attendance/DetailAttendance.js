import { Card } from "antd";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	clearLeaveApplication,
	loadSingelLeaveApplication,
} from "../../redux/rtk/features/leave/leaveSlice";
import tw from "tailwind-styled-components";
import { useParams } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import dayjs from "dayjs";
import ReviewLeavePopup from "../UI/PopUp/ReviewLeavePopup";
import {
	clearAttendance,
	loadSingleAttendance,
} from "../../redux/rtk/features/attendance/attendanceSlice";

const DetailAttendance = () => {
	const { id } = useParams("id");
	const attendance = useSelector((state) => state.attendance.attendance);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSingleAttendance(id));

		return () => {
			dispatch(clearAttendance());
		};
	}, []);

	return (
		<div>
			<PageTitle title='Retour' />
			<Card className='mt-4'>
				<div className='text-center mb-4'>
					{" "}
					<h2 className='text-2xl font-semibold text-gray-600'>
					Statut de présence#{attendance?.id}{" "}
					</h2>
				</div>
				{attendance ? (
					<div className='flex justify-center '>
						<ul className='list-inside list-none border-2 border-inherit rounded px-5 py-5 '>
							<ListItem>
							Nom :{" "}
								<TextInside>
									{(
										attendance?.user.firstName +
										" " +
										attendance?.user.lastName
									).toUpperCase()}{" "}
								</TextInside>
							</ListItem>

							<ListItem>
							Adresse IP : <TextInside>{attendance?.ip} </TextInside>
							</ListItem>
							<ListItem>
							À l'heure :{" "}
								<TextInside>
									{dayjs(attendance.inTime).format("DD-MM-YYYY, h:mm A")}
								</TextInside>
							</ListItem>
							<ListItem>
							Temps d'arrêt :{" "}
								<TextInside>
									{dayjs(attendance.outTime).format("DD-MM-YYYY, h:mm A")}
								</TextInside>
							</ListItem>
							<ListItem>
							Dans le statut temporel:{" "}
								<TextInside>
									{attendance.inTimeStatus === "Late" ? (
										<span className='text-red-500'>
											{attendance.inTimeStatus.toUpperCase()}
										</span>
									) : attendance.inTimeStatus === "Early" ? (
										<span className='text-yellow-500'>
											{attendance.inTimeStatus.toUpperCase()}
										</span>
									) : (
										<span className='text-green-500'>
											{attendance.inTimeStatus.toUpperCase()}
										</span>
									)}
								</TextInside>
							</ListItem>
							<ListItem>
							Statut du temps d'absence :{" "}
								<TextInside>
									{attendance.outTimeStatus === "Late" ? (
										<span className='text-red-500'>
											{attendance.outTimeStatus.toUpperCase()}
										</span>
									) : attendance.outTimeStatus === "Early" ? (
										<span className='text-yellow-500'>
											{attendance.outTimeStatus.toUpperCase()}
										</span>
									) : (
										<span className='text-green-500'>
											{attendance.outTimeStatus.toUpperCase()}
										</span>
									)}
								</TextInside>
							</ListItem>
							<ListItem>
								entreprise :{" "}
								<TextInside className='text-green-500'>
									{attendance.punchBy || "ON REVIEW"}
								</TextInside>
							</ListItem>

							<ListItem>
								Commentaire :{" "}
								<TextInside>{attendance.comment || "No comment"}</TextInside>
							</ListItem>
						</ul>
					</div>
				) : (
					<Loader />
				)}
			</Card>
		</div>
	);

	// "reviewComment": null,
	// "attachment": null,
};

const ListItem = tw.li`
text-sm
text-gray-600
font-semibold
py-2
px-4
bg-gray-100
mb-1.5
rounded
w-96
flex
justify-start
`;

const TextInside = tw.p`
ml-2
text-sm
text-gray-900
`;
export default DetailAttendance;
