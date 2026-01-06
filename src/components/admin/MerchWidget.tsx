"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Plus, Trash2, Edit2, X, Check } from "lucide-react";
import {
    MerchProduct,
    subscribeToMerch,
    addMerch,
    updateMerch,
    deleteMerch
} from "@/lib/firestore";

const COLOR_OPTIONS = [
    { value: "bg-pacific", label: "Pacific Blue" },
    { value: "bg-tide", label: "Tide Green" },
    { value: "bg-dune", label: "Dune Sand" },
    { value: "bg-ember", label: "Ember Orange" },
    { value: "bg-cliff", label: "Cliff Dark" },
    { value: "bg-driftwood", label: "Driftwood" },
];

export default function MerchWidget() {
    const [products, setProducts] = useState<MerchProduct[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [tag, setTag] = useState("");
    const [imageColor, setImageColor] = useState("bg-pacific");

    useEffect(() => {
        const unsubscribe = subscribeToMerch(setProducts);
        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setName("");
        setPrice("");
        setTag("");
        setImageColor("bg-pacific");
        setIsAdding(false);
        setEditingId(null);
    };

    const handleAdd = async () => {
        if (!name.trim() || !price.trim()) return;
        await addMerch({
            name: name.trim(),
            price: price.trim(),
            tag: tag.trim() || undefined,
            imageColor,
            order: products.length
        });
        resetForm();
    };

    const handleEdit = (product: MerchProduct) => {
        setEditingId(product.id);
        setName(product.name);
        setPrice(product.price);
        setTag(product.tag || "");
        setImageColor(product.imageColor);
    };

    const handleUpdate = async () => {
        if (!editingId || !name.trim() || !price.trim()) return;
        await updateMerch(editingId, {
            name: name.trim(),
            price: price.trim(),
            tag: tag.trim() || undefined,
            imageColor
        });
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this product?")) {
            await deleteMerch(id);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tide flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" /> Merch Products
                </h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="p-2 rounded-full bg-pacific/10 text-pacific hover:bg-pacific-200 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="mb-4 p-4 bg-stone-50 rounded-lg space-y-3">
                    <input
                        type="text"
                        placeholder="Product name (e.g., 'Tour Tee 2025')"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Price (e.g., '$35')"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Tag (optional, e.g., 'New Drop')"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-stone-500 mb-1 block">Card Color</label>
                        <div className="flex gap-2 flex-wrap">
                            {COLOR_OPTIONS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setImageColor(color.value)}
                                    className={`w-8 h-8 rounded-lg ${color.value} ${imageColor === color.value ? "ring-2 ring-offset-2 ring-pacific" : ""
                                        }`}
                                    title={color.label}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={editingId ? handleUpdate : handleAdd}
                            className="flex-1 py-2 bg-pacific text-white rounded-lg text-sm font-medium hover:bg-tide flex items-center justify-center gap-1"
                        >
                            <Check className="w-4 h-4" />
                            {editingId ? "Update" : "Add Product"}
                        </button>
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-stone-200 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Products List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {products.length === 0 ? (
                    <p className="text-stone-400 text-sm text-center py-4">No products yet. Add your first one!</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between p-3 bg-stone-50 rounded-lg group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${product.imageColor}`} />
                                <div>
                                    <p className="font-medium text-stone-800">{product.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-stone-600">{product.price}</span>
                                        {product.tag && (
                                            <span className="text-xs px-2 py-0.5 bg-ember/20 text-ember rounded">
                                                {product.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="p-1.5 text-stone-400 hover:text-pacific hover:bg-pacific/10 rounded"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

