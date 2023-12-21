import axios from "axios";
import { useEffect, useState } from "react";

const Benefit = () => {
    const [benefitedUser, setBenefitedUser] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:2900/benefits")
            .then((res) => setBenefitedUser(res.data));
    }, []);
    console.log(benefitedUser);

    return (
        <div className="my-14">
            <div>
                <div>
                    <h1 className="md:text-5xl text-2xl text-center uppercase font-medium text-teal-800 ">
                        Benefited Talks
                    </h1>
                </div>
                <div className="flex justify-center">
                    <div className="w-[390px] border-teal-800 border-4"></div>
                </div>
            </div>
            <div className="flex justify-center items-center h-[calc(100vh-320px)] border border-black">
                <div>
                    <div className="max-w-screen-xl mx-auto">
                       {
                            benefitedUser.map(benefitUser =>  <table key={benefitUser?._id} className="table-auto border border-black w-[920px]">
                            <tbody>
                                <tr className="flex justify-between">
                                    <td>{benefitUser?.name}</td>
                                    <td>{benefitUser?.profession}</td>
                                    <td>{benefitUser?.review}</td>
                                </tr>
                            </tbody>
                        </table>)
                       }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefit;
