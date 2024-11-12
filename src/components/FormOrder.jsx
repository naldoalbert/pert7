import React, { useState } from "react";
import Button from "./Button";

export const FormOrder = () => {
    const [order, setOrder] = useState({
        name: "",
        date: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleAddOrder = async (e) => {
        e.preventDefault();

        if (!order.name || !order.date) {
            setError("Semua field harus diisi!");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("http://localhost/todo-app/api/index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            if (!res.ok) {
                throw new Error("Gagal menambah pemesanan");
            }

            const data = await res.json();
            console.log(data);
            setOrder({ name: "", date: "" });
        } catch (err) {
            console.error(err);
            setError(err.message || "Terjadi kesalahan saat menambah pemesanan.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleAddOrder} className="mb-4 flex gap-3 items-center">
            <input
                className="p-2 border-2 border-gray-400 rounded-lg flex-grow"
                type="text"
                placeholder="Nama Pemesan"
                value={order.name}
                onChange={(e) => setOrder({ ...order, name: e.target.value })}
                required
            />
            <input
                className="p-2 border-2 border-gray-400 rounded-lg flex-grow"
                type="date"
                value={order.date}
                onChange={(e) => setOrder({ ...order, date: e.target.value })}
                required
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menambahkan..." : "Tambah Pemesanan"}
            </Button>
            {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
        </form>
    );
};