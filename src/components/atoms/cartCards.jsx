import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import CommonButton from "./commonButton";
import { useNavigate } from "react-router-dom";

const CartCard = (prop) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex gap-4">
        <img src={prop.data.img[0]} alt="" className={"rounded-lg w-32 h-30"} />
        <div className="flex flex-col justify-around">
          <div>
            <div className={`text-tandur font-poppinsSemibold text-2xl`}>{prop.data.name}</div>
            <div className={`text-[#4A4A4A] font-poppinsBold text-lg`}>
              {currencyFormat(revertCurrency(prop.data.total.toString() || ""), "Rp. ")}
            </div>
          </div>
          <div className={`text-[#828282] font-poppins text-lg`}>Qty: {prop.data.qty}</div>
        </div>
      </div>
      <CommonButton
        type="button"
        title="Beli Sekarang"
        onClick={() => {
          const values = {
            id_product: prop.data.id,
            qty: prop.data.qty,
            total_harga: prop.data.total,
          };
          navigate("/market/order/" + prop.data.id, { state: { values } });
        }}
        disabled
        customStyle="!mb-0 !mt-4"
      />
    </div>
  );
};

export default CartCard;
