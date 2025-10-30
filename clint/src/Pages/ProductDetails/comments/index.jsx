import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notify from "../../../Utils/Notify";
import StarRatings from "react-star-ratings";
import { Line } from "rc-progress";
import fetchData from "../../../Utils/fetchData";
import Loading from "../../../components/Loding";

export default function Comment({ productId }) {
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth || {});

  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoadingComments(true);
      const res = await fetchData(`comments/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(res?.data?.data);
      setIsLoadingComments(false);
    })();
  }, [productId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      Notify("error", "برای ثبت نظر ابتدا وارد شوید.");
      navigate("/auth");
      return;
    }
    if (!content.trim()) {
      Notify("error", "لطفاً متن نظر را وارد کنید.");
      return;
    }

    const payload = {
      productId,
      content: content.trim(),
      rating: Number(rating || 0),
    };
    setIsSubmitting(true);

    fetchData("comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      setIsSubmitting(false);
      if (res?.success && res.data) {
        Notify("success", res.message || "نظر شما ثبت شد و منتظر تایید است.");
        setContent("");
        setRating(0);
      } else {
        Notify("error", res?.message || "مشکلی در ثبت نظر رخ داد.");
      }
    });
  };
  const formatPhone = (phone) => {
    const ltrPhone = phone.split("").reverse().join("");
    const formatted = ltrPhone.slice(-4) + "****" + ltrPhone.slice(0, 4);
    return formatted.split("").reverse().join("");
  };

  return (
    <section dir="rtl" className="mt-8 w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold">نظرات کاربران</h3>
            <div className="text-sm text-gray-500">
              تعداد نظرات: {comments.length}
            </div>
          </div>

          <div className="w-40 text-right">
            <div className="text-xs text-gray-500">امتیاز میانگین</div>
            <div className="flex items-center gap-3">
              <div className="w-16">
                <Line
                  percent={Number(comments?.averageRatingPercent || 0)}
                  strokeWidth={6}
                  trailWidth={6}
                />
              </div>
              <div className="text-sm font-semibold">
                {Number(comments?.averageRating || 0).toFixed(1)} / 5
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h4 className="font-medium mb-2">ثبت نظر شما</h4>

        {!token ? (
          <div className="text-sm text-gray-600">
            برای ثبت نظر باید وارد شوید.
            <button
              onClick={() => navigate("/auth")}
              className="mr-2 text-sm text-indigo-600 underline"
            >
              ورود / ثبت نام
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">امتیاز شما:</div>
              <StarRatings
                rating={rating}
                changeRating={(newRating) => setRating(newRating)}
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#f59e0b"
              />
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="نظر خود را اینجا بنویسید..."
              rows={4}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-sm disabled:opacity-60"
              >
                {isSubmitting ? "در حال ارسال..." : "ثبت نظر"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setContent("");
                  setRating(0);
                }}
                className="px-3 py-2 border rounded-md text-sm"
              >
                پاک کردن
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-3">
        {isLoadingComments ? (
          <Loading />
        ) : comments.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            هنوز نظری برای این محصول ثبت نشده است.
          </div>
        ) : (
          comments.map((e, index) => {
            const authorName =
              e.userId?.fullname ||
              formatPhone(e?.userId?.phoneNumber) ||
              "کاربر";
            const created = new Date(e.createdAt).toLocaleString("fa-IR");

            return (
              <article
                key={e._id}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <header className="flex items-start justify-between gap-3 mb-2">
                  <div className="text-right">
                    <h5 className="font-medium">{authorName}</h5>
                    <div className="text-xs text-gray-500">{created}</div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <StarRatings
                      rating={Number(e.rating || 0)}
                      numberOfStars={5}
                      starDimension="16px"
                      starSpacing="1px"
                      starRatedColor="#f59e0b"
                    />
                  </div>
                </header>

                <div className="text-right whitespace-pre-wrap">
                  {e.content}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
