// frontend/pages/QuotePage.jsx
import React, { useState } from "react";
import styles from "./QuoteForm.module.css";

const today = new Date();
const getFormattedDate = () => today.toLocaleDateString("zh-TW");

const QuotePage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    phone: "",
    fax: "",
    email: "",
    mobile: "",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1, price: 0, note: "" },
  ]);

  const [showDiscount, setShowDiscount] = useState(false);
  const [remarks, setRemarks] = useState(["交貨期限", "交貨地點", "付款條件", "報價期限"]);
  const [customRemark, setCustomRemark] = useState("");

  const addItem = () => setItems([...items, { name: "", qty: 1, price: 0, note: "" }]);
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>億威奇企業有限公司 報價單</h1>
      <div className={styles.row}>
        <div>
          <p>公司地址：高雄市岡山區永樂街20號</p>
          <p>TEL: 07-6216800 / FAX: 07-6215147</p>
        </div>
        <div>
          <p>報價日期：{getFormattedDate()}</p>
          <p>報價編號：114I0720A</p>
        </div>
      </div>

      <h3>客戶資訊</h3>
      <input placeholder="公司 / 姓名" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
      <input placeholder="聯絡人" value={customer.contact} onChange={(e) => setCustomer({ ...customer, contact: e.target.value })} />
      <input placeholder="電話" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
      <input placeholder="傳真" value={customer.fax} onChange={(e) => setCustomer({ ...customer, fax: e.target.value })} />
      <input placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
      <input placeholder="行動電話" value={customer.mobile} onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })} />

      <h3>報價項目</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>項目</th>
            <th>數量</th>
            <th>單價</th>
            <th>備註</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td><input value={item.name} onChange={(e) => {
                const newItems = [...items];
                newItems[idx].name = e.target.value;
                setItems(newItems);
              }} /></td>
              <td><input type="number" value={item.qty} onChange={(e) => {
                const newItems = [...items];
                newItems[idx].qty = parseInt(e.target.value);
                setItems(newItems);
              }} /></td>
              <td><input type="number" value={item.price} onChange={(e) => {
                const newItems = [...items];
                newItems[idx].price = parseFloat(e.target.value);
                setItems(newItems);
              }} /></td>
              <td><input value={item.note} onChange={(e) => {
                const newItems = [...items];
                newItems[idx].note = e.target.value;
                setItems(newItems);
              }} /></td>
              <td><button onClick={() => removeItem(idx)}>刪除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addItem}>新增項目</button>

      <div>
        <label>
          <input type="checkbox" checked={showDiscount} onChange={(e) => setShowDiscount(e.target.checked)} />
          顯示優惠價（原價刪除線）
        </label>
      </div>

      <div>
        <h4>總價：NT$ {total.toLocaleString()}</h4>
      </div>

      <h3>附註</h3>
      {remarks.map((r, idx) => (
        <div key={idx}>
          <input value={r} onChange={(e) => {
            const newRemarks = [...remarks];
            newRemarks[idx] = e.target.value;
            setRemarks(newRemarks);
          }} />
        </div>
      ))}
      <button onClick={() => setRemarks([...remarks, ""])}>新增附註</button>

      <div className={styles.stamp}>
        <img src="/images/stamp.png" alt="公司章" />
      </div>
    </div>
  );
};

export default QuotePage;