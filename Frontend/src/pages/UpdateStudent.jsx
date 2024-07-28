import Form from "../components/Form";
import { useParams } from "react-router-dom";
import studentService from "../service/StudentService";
import { useEffect, useState } from "react";
const UpdateStudent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const res = await studentService.getStudentDetailsByRoll({ value: id });
      const studentInfo = res.data.studentInfo[0];
      const studentAcademicInfo = res.data.studentAcademicInfo[0];
      setData({
        rollNo: studentInfo.rollNo,
        name: studentInfo.name,
        email: studentInfo.email,
        mobile: studentInfo.mobile,
        city: studentInfo.address.city,
        state: studentInfo.address.state,
        pin: studentInfo.address.pin,
        program: studentAcademicInfo.program,
        branch: studentAcademicInfo.branch,
        cgpa: studentAcademicInfo.cgpa,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (data != null) {
    return <Form type="Update" data={data} />;
  }
};

export default UpdateStudent;
