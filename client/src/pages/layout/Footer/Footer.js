import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div>
        <Image
          width={100}
          height={100}
          src="https://ghienphim3.net/client_assets/images/donate_bg.jpg"
          alt=""
          className="my-10"
        />
        <div className="flex justify-around max-sm:grid grid-cols-2 pb-4">
          <div className="px-8 py-4">
            <div className="font-medium text-xl">
              <span className="text-orange-500">/</span> Liên hệ
            </div>
            <ul className="mt-5">
              <li className="li">test@gmail.com</li>
              <li className="li">Fanpage</li>
              <li className="li">i9bet09.com</li>
              <li className="li">web6588.com</li>
            </ul>
          </div>
          <div className="px-8 py-4">
            <div className="font-medium text-xl">
              <span className="text-orange-500">/</span> Hỗ trợ
            </div>
            <ul className="mt-5">
              <li className="li">Hỗ trợ quảng cáo</li>
              <li className="li">Hỏi đáp</li>
              <li className="li">Tư vấn</li>
              <li className="li">Chia sẻ kinh nghiệm</li>
            </ul>
          </div>
          <div className="px-8 py-4">
            <div className="font-medium text-xl">
              <span className="text-orange-500">/</span> Quy định
            </div>
            <ul className="mt-5">
              <li className="li">Điều khoản sử dụng</li>
              <li className="li">Quyền riêng tư</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
