import React, { useState, useEffect } from 'react';
import '../style/Wallet.css';
import { auth, db } from '/src/firebase.js'
import { collection, addDoc, query, where, onSnapshot, Timestamp } from 'firebase/firestore';

const Wallet = () => {
  const [amount, setAmount] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [transactionType, setTransactionType] = useState('transfer');
  const [transferMethod, setTransferMethod] = useState('bank');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      const q = query(collection(db, 'wallet'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistory(data.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
        const total = data.reduce((sum, item) => item.status !== 'pending' ? sum + Number(item.amount) : sum, 0);
        setAmount(total);
      });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTransaction = async () => {
    if (!transactionAmount || isNaN(transactionAmount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (transactionType === 'transfer' && !recipient) {
      alert("Recipient name is required.");
      return;
    }

    if (transactionType === 'withdraw' && (!accountName || !accountNumber)) {
      alert("Bank details are required for withdrawal.");
      return;
    }

    if (transactionType === 'deposit' && (!cardNumber || !cardCVV || !cardExpiry)) {
      alert("Card details required for deposit.");
      return;
    }

    setLoading(true);
    const value = Number(transactionAmount);
    let finalAmount = 0;
    let status = 'completed';

    if (transactionType === 'deposit') {
      finalAmount = value;
    } else if (transactionType === 'withdraw') {
      finalAmount = -value;
      status = 'pending';
    } else {
      finalAmount = -value;
    }

    try {
      await addDoc(collection(db, 'wallet'), {
        userId,
        accountName,
        accountNumber,
        cardNumber,
        cardCVV,
        cardExpiry,
        recipient,
        amount: finalAmount,
        type: transactionType,
        status,
        method: transferMethod,
        timestamp: Timestamp.now(),
      });

      alert(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} ${status === 'pending' ? 'Requested (Pending)' : 'Successful'}`);
      setTransactionAmount('');
      setRecipient('');
    } catch (err) {
      console.error("Transaction Error:", err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  const getCardType = (number) => {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'MasterCard';
    if (/^3[47]/.test(number)) return 'American Express';
    return 'Unknown';
  };

  const totalDeposits = history.filter(h => h.type === 'deposit').reduce((sum, h) => sum + Number(h.amount), 0);
  const totalWithdrawals = history.filter(h => h.type === 'withdraw').reduce((sum, h) => sum + Math.abs(Number(h.amount)), 0);
  const totalTransfers = history.filter(h => h.type === 'transfer').reduce((sum, h) => sum + Math.abs(Number(h.amount)), 0);
  const netEarnings = totalDeposits - totalWithdrawals - totalTransfers;

  return (
    <>
      <div className="Card">
        <h1 className="Title">Wallet</h1>
        <p className="Subtitle">Manage Your Zenthra Balance</p>
      </div>

      <div className="descriptionBox">
        <p style={{ textAlign: 'center', color: '#555', marginBottom: '20px' }}>
          Welcome to Zenthra Wallet! Use your Zs to deposit, send, or withdraw securely.
        </p>
        <p>Time: {time.toLocaleTimeString()}</p>
      </div>

      <div className="UserAcountBox">
        <h1 className="amount">
          {showBalance ? <span><span className="zSign">Z</span>{amount}</span> : '••••••'}
        </h1>
        <button className="toggleBalance" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? 'Hide Balance' : 'Show Balance'}
        </button>
        <p className="userInfo">Account: {accountNumber || 'Not set'} | Card: {cardNumber || 'Not set'} ({getCardType(cardNumber)})</p>
      </div>

      <div className="formBox">
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="transfer">Send Money</option>
          <option value="withdraw">Withdraw</option>
        </select>

        <input type="number" placeholder="Amount (Z)" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} />

        {transactionType === 'transfer' && (
          <>
            <select value={transferMethod} onChange={(e) => setTransferMethod(e.target.value)}>
              <option value="bank">Bank Transfer</option>
              <option value="atm">ATM Card</option>
            </select>

            <input type="text" placeholder="Recipient Name" value={recipient} onChange={(e) => setRecipient(e.target.value)} />

            {transferMethod === 'bank' && (
              <>
                <input type="text" placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                <input type="text" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </>
            )}

            {transferMethod === 'atm' && (
              <>
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                <input type="text" placeholder="CVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} maxLength={4} />
                <input type="text" placeholder="Expiry (MM/YY)" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
              </>
            )}
          </>
        )}

        {transactionType === 'deposit' && (
          <>
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <input type="text" placeholder="CVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} maxLength={4} />
            <input type="text" placeholder="Expiry (MM/YY)" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
          </>
        )}

        {transactionType === 'withdraw' && (
          <>
            <input type="text" placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            <input type="text" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          </>
        )}

        <button onClick={handleTransaction} disabled={loading}>
          {loading ? 'Processing...' :
            transactionType === 'transfer' ? 'Send Money' :
              transactionType === 'withdraw' ? 'Request Withdraw' : 'Deposit'}
        </button>
      </div>

      <div className="summaryBox">
        <p>Total Deposits: <strong><span className="zSign">Z</span>{totalDeposits}</strong></p>
        <p>Total Withdrawals: <strong><span className="zSign">Z</span>{totalWithdrawals}</strong></p>
        <p>Total Transfers: <strong><span className="zSign">Z</span>{totalTransfers}</strong></p>
        <p><strong>Net Earnings:</strong> <span className="zSign">Z</span>{netEarnings}</p>
      </div>

      <div className="historyBox">
        <h2>Transaction History</h2>
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              <strong>{h.type.toUpperCase()}</strong> of <span className="zSign">Z</span>{Math.abs(h.amount)}
              {h.recipient && <> to <em>{h.recipient}</em></>}
              <br />
              <small>{new Date(h.timestamp?.seconds * 1000).toLocaleString()}</small><br />
              <span className={`status ${h.status}`}>{h.status.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Wallet;
