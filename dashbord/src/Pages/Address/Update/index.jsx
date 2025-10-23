import React, { useEffect, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateAddress() {
  const { id } = useParams();
  const [fields, handleChange, setFields] = useFormFields({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    receiverPhoneNumber: "",
    receiverFullName: "",
    pelak: "",
    description: "",
    label: "",
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchData(`Address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) setFields(result.data);
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetchData(`Address/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", "آدرس با موفقیت ویرایش شد");
      navigate("/address");
    } else {
      Notify("error", result.message);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش آدرس
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "label", placeholder: "برچسب آدرس" },
            { name: "receiverFullName", placeholder: "نام گیرنده" },
            { name: "receiverPhoneNumber", placeholder: "شماره تماس گیرنده" },
            { name: "pelak", placeholder: "پلاک" },
            { name: "city", placeholder: "شهر" },
            { name: "state", placeholder: "استان" },
            { name: "postalCode", placeholder: "کد پستی" },
            { name: "street", placeholder: "خیابان" },
          ].map((input) => (
            <input
              key={input.name}
              type="text"
              name={input.name}
              placeholder={input.placeholder}
              className="bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
              value={fields[input.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <textarea
          name="description"
          placeholder="توضیحات"
          className="bg-white/5 border border-white/20 rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          value={fields.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
