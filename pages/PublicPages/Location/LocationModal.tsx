"use client";

// components/LocationModal.tsx
import React, { useEffect, useState } from "react";

type Division = { id: string; name: string };
type District = { id: string; name: string };
type Upazila = { id: string; name: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onSelectUpazila: (upazila: Upazila) => void;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function LocationModal({ open, onClose, onSelectUpazila }: Props) {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load divisions when modal opens
  useEffect(() => {
    if (!open) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/divisions`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load divisions");
        return r.json();
      })
      .then((data) => {
        // adapt based on your backend response shape (here expecting array)
        if (mounted) setDivisions(data.data ?? data ?? []);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Error loading divisions");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [open]);

  // load districts when division selected
  useEffect(() => {
    if (!selectedDivision) {
      setDistricts([]);
      return;
    }
    setDistricts([]);
    setUpazilas([]);
    setSelectedDistrict(null);
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/districts/${selectedDivision}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load districts");
        return r.json();
      })
      .then((data) => setDistricts(data.data ?? data ?? []))
      .catch((err) => setError(err.message || "Error loading districts"))
      .finally(() => setLoading(false));
  }, [selectedDivision]);

  // load upazilas when district selected
  useEffect(() => {
    if (!selectedDivision || !selectedDistrict) {
      setUpazilas([]);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/upazilas/${selectedDivision}/${selectedDistrict}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load upazilas");
        return r.json();
      })
      .then((data) => setUpazilas(data.data ?? data ?? []))
      .catch((err) => setError(err.message || "Error loading upazilas"))
      .finally(() => setLoading(false));
  }, [selectedDistrict, selectedDivision]);

  if (!open) return null;

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
  {/* Overlay */}
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
    onClick={onClose}
  />

  {/* Modal Box */}
  <div
    className="relative z-10 bg-white rounded-2xl shadow-2xl 
      w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 
      max-w-3xl p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh]"
  >
    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-center">
      Select Location
    </h3>

    {error && (
      <div className="text-sm text-red-600 mb-3 text-center">{error}</div>
    )}

    {/* Responsive 3-column layout for tablet+ */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Division */}
      <div>
        <label className="block text-sm font-medium mb-1">Division</label>
        <select
          value={selectedDivision ?? ""}
          onChange={(e) => setSelectedDivision(e.target.value || null)}
          className="w-full border rounded-lg p-2 sm:p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">-- Select Division --</option>
          {divisions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium mb-1">District</label>
        <select
          value={selectedDistrict ?? ""}
          onChange={(e) => setSelectedDistrict(e.target.value || null)}
          disabled={!districts.length}
          className="w-full border rounded-lg p-2 sm:p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
        >
          <option value="">-- Select District --</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upazila */}
      <div>
        <label className="block text-sm font-medium mb-1">Upazila</label>
        <select
          onChange={(e) => {
            const upazilaId = e.target.value;
            const u = upazilas.find((x) => x.id === upazilaId);
            if (u) {
              onSelectUpazila(u);
              onClose();
            }
          }}
          disabled={!upazilas.length}
          className="w-full border rounded-lg p-2 sm:p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
        >
          <option value="">-- Select Upazila --</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <button
        onClick={onClose}
        className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        onClick={onClose}
        className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
      >
        Close
      </button>
    </div>

    {loading && <div className="text-sm mt-3 text-center">Loading…</div>}
  </div>
</div>


  );
}












// interface LocationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   divisions: { id: string; name: string }[];
// }

// const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, divisions }) => {
//   if (!isOpen) return null; // Modal বন্ধ থাকলে কিছু দেখাবে না

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px]">
//         <h2 className="text-xl font-semibold mb-4 text-center">Select Division</h2>

//         <ul className="space-y-2">
//           {divisions.map((div) => (
//             <li
//               key={div.id}
//               className="border p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer transition"
//             >
//               {div.name}
//             </li>
//           ))}
//         </ul>

//         <button
//           onClick={onClose}
//           className="mt-5 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LocationModal;
