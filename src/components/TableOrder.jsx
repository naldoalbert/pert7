import React, { useEffect, useState } from "react";
import Button from "./Button";

export const TableOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await fetch("http://localhost/todo-app/api/index.php");
                const data = await res.json();
                setOrders(data); // Pastikan data ini benar
            } catch (error) {
                console.error("Gagal mengambil pemesanan:", error);
            }
        };
        getOrders();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const updateOrder = async (orderId, currentStatus) => {
        try {
            const newStatus = currentStatus === "Dipesan" ? "Dibatalkan" : "Dipesan";
            const res = await fetch("http://localhost/todo-app/api/index.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: orderId, status: newStatus }),
            });
            const data = await res.json();
            console.log(data);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Gagal memperbarui pemesanan:", error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const res = await fetch("http://localhost/todo-app/api/index.php", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: orderId }),
            });
            const data = await res.json();
            console.log(data);

            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error("Gagal menghapus pemesanan:", error);
        }
    };

    return (
        <table className="min-w-full border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Nama Pemesan</th>
                    <th className="border border-gray-300 p-2">Tanggal Pemesanan</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="border border-gray-300 p-2">{order.name}</td>
                        <td className="border border-gray-300 p-2">{formatDate(order.date)}</td>
                        <td className="border border-gray-300 p-2">{order.status}</td>
                        <td className="border border-gray-300 p-2">
                            <Button
                                onClick={() => updateOrder(order.id, order.status)}
                                className={order.status === "Dipesan" ? 'mx-5 bg-yellow-500' : 'mx-5 bg-blue-500'}
                            >
                                {order.status === "Dipesan" ? "Batalkan" : "Pesan Ulang"}
                            </Button>
                            <Button onClick={() => deleteOrder(order.id)} className='bg-red-500'>Hapus</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
