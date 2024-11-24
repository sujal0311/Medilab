import React, { useState, useEffect } from 'react';
import "./Staff.css"
function StaffHome() {
    // Sample initial stock data
const initialStock = [
    { name: 'Paracetamol', quantity: 100, price: 10 },
    { name: 'Ibuprofen', quantity: 200, price: 15 },
    { name: 'Amoxicillin', quantity: 150, price: 50 }
];
    const [stock, setStock] = useState(initialStock);
    const [medicineName, setMedicineName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [newMedicine, setNewMedicine] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [newPrice, setNewPrice] = useState(0);

    // Render stock list
    useEffect(() => {
        renderStockList();
    }, [stock]);

    // Function to render stock in table
    const renderStockList = () => {
        return stock.map((item, index) => (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td><button onClick={() => updateStock(index)}>Update Stock</button></td>
            </tr>
        ));
    };

    // Handle billing (calculate total)
    const processBilling = () => {
        const item = stock.find(med => med.name.toLowerCase() === medicineName.toLowerCase());

        if (!item) {
            alert('Medicine not found in stock.');
            return;
        }

        if (item.quantity < quantity) {
            alert('Insufficient stock.');
            return;
        }

        const totalAmount = quantity * item.price;
        setTotal(totalAmount);

        // Update stock quantity after sale
        item.quantity -= quantity;
        setStock([...stock]);
    };

    // Add or update medicine stock
    const addOrUpdateMedicine = () => {
        const existingMedicine = stock.find(item => item.name.toLowerCase() === newMedicine.toLowerCase());

        if (existingMedicine) {
            // If medicine exists, update stock and price
            existingMedicine.quantity += newQuantity;
            existingMedicine.price = newPrice;
        } else {
            // If new medicine, add to stock
            setStock([...stock, { name: newMedicine, quantity: newQuantity, price: newPrice }]);
        }

        // Clear the form fields
        setNewMedicine('');
        setNewQuantity(0);
        setNewPrice(0);
    };

    // Update stock for existing medicine
    const updateStock = (index) => {
        const newQuantity = prompt(`Enter new quantity for ${stock[index].name}:`, stock[index].quantity);
        
        if (newQuantity !== null && !isNaN(newQuantity)) {
            const updatedStock = [...stock];
            updatedStock[index].quantity = parseInt(newQuantity);
            setStock(updatedStock);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Medilab Dispensary</h1>
            </header>

            {/* Billing Section */}
            <section id="billing">
                <h2>Billing</h2>
                <form>
                    <label htmlFor="medicineName">Medicine Name:</label>
                    <input 
                        type="text" 
                        id="medicineName" 
                        value={medicineName} 
                        onChange={(e) => setMedicineName(e.target.value)} 
                        required 
                    />

                    <label htmlFor="quantity">Quantity:</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        required 
                    />

                    <button type="button" onClick={processBilling}>Process Billing</button>
                </form>
                <p>Total: ₹{total.toFixed(2)}</p>
            </section>

            {/* Medicine Stock Section */}
            <section id="stock">
                <h2>Medicine Stock</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Quantity Available</th>
                            <th>Price per Unit (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderStockList()}
                    </tbody>
                </table>

                <h3>Add or Update Medicine Stock</h3>
                <form>
                    <label htmlFor="newMedicine">Medicine Name:</label>
                    <input 
                        type="text" 
                        id="newMedicine" 
                        value={newMedicine} 
                        onChange={(e) => setNewMedicine(e.target.value)} 
                        required 
                    />

                    <label htmlFor="newQuantity">Quantity:</label>
                    <input 
                        type="number" 
                        id="newQuantity" 
                        value={newQuantity} 
                        onChange={(e) => setNewQuantity(e.target.value)} 
                        required 
                    />

                    <label htmlFor="newPrice">Price per Unit (₹):</label>
                    <input 
                        type="number" 
                        id="newPrice" 
                        value={newPrice} 
                        onChange={(e) => setNewPrice(e.target.value)} 
                        required 
                    />

                    <button type="button" onClick={addOrUpdateMedicine}>Add/Update Stock</button>
                </form>
            </section>
        </div>
    );
}

export default StaffHome