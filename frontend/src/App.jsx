// import { useState } from "react";
// import { signup, login, logout, forgotPassword, removeBackground } from "./api";
// import "./index.css";

// function App() {
//   const [page, setPage] = useState("login"); // login | signup | forgot | upload
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [processed, setProcessed] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   // ===== Handlers =====
//   const handleChangeFile = (e) => {
//     const selected = e.target.files[0];
//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//     setProcessed(null);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please select an image first!");
//     setLoading(true);
//     try {
//       const url = await removeBackground(file);
//       setProcessed(url);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async () => {
//     const res = await signup(form.name, form.email, form.password);
//     alert(res.message || res.error);
//     if (!res.error) setPage("login");
//   };

//   const handleLogin = async () => {
//     const res = await login(form.email, form.password);
//     alert(res.message || res.error);
//     if (!res.error) setPage("upload");
//   };

//   const handleForgot = async () => {
//     const res = await forgotPassword(form.email);
//     alert(res.message || res.error);
//   };

//   const handleLogout = async () => {
//     await logout();
//     setPage("login");
//     setFile(null);
//     setPreview(null);
//     setProcessed(null);
//     setForm({ name: "", email: "", password: "" });
//   };

//   // ===== JSX =====
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">🪄 Background Remover</h1>

//       {page === "login" && (
//         <div className="flex flex-col gap-4 w-80">
//           <input
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//             className="p-2 rounded bg-gray-800"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={e => setForm({ ...form, password: e.target.value })}
//             className="p-2 rounded bg-gray-800"
//           />
//           <button onClick={handleLogin} className="bg-blue-500 p-2 rounded hover:bg-blue-600">Login</button>
//           <div className="flex justify-between text-sm">
//             <button onClick={() => setPage("signup")} className="underline">Signup</button>
//             <button onClick={() => setPage("forgot")} className="underline">Forgot?</button>
//           </div>
//         </div>
//       )}

//       {page === "signup" && (
//         <div className="flex flex-col gap-4 w-80">
//           <input
//             placeholder="Name"
//             value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })}
//             className="p-2 rounded bg-gray-800"
//           />
//           <input
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//             className="p-2 rounded bg-gray-800"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={e => setForm({ ...form, password: e.target.value })}
//             className="p-2 rounded bg-gray-800"
//           />
//           <button onClick={handleSignup} className="bg-green-500 p-2 rounded hover:bg-green-600">Signup</button>
//           <button onClick={() => setPage("login")} className="underline mt-2">Back to Login</button>
//         </div>
//       )}

//       {page === "forgot" && (
//         <div className="flex flex-col gap-4 w-80">
//           <input
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//             className="p-2 rounded bg-gray-800"
//           />
//           <button onClick={handleForgot} className="bg-yellow-500 p-2 rounded hover:bg-yellow-600">Send Reset Link</button>
//           <button onClick={() => setPage("login")} className="underline mt-2">Back to Login</button>
//         </div>
//       )}

//       {page === "upload" && (
//         <div className="flex flex-col items-center">
//           <input type="file" accept="image/*" onChange={handleChangeFile} className="mb-4"/>
//           {preview && (
//             <div className="flex gap-8 mt-4">
//               <div>
//                 <h2 className="mb-2 font-semibold">Original</h2>
//                 <img src={preview} alt="preview" className="w-64 h-64 object-contain border rounded-xl shadow-lg"/>
//               </div>
//               {processed && (
//                 <div>
//                   <h2 className="mb-2 font-semibold">Processed</h2>
//                   <img src={processed} alt="processed" className="w-64 h-64 object-contain border rounded-xl shadow-lg bg-white"/>
//                   <a href={processed} download="bg-removed.png" className="mt-2 block text-center bg-green-500 px-4 py-2 rounded-lg">Download</a>
//                 </div>
//               )}
//             </div>
//           )}
//           <button
//             onClick={handleUpload}
//             disabled={loading}
//             className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Remove Background"}
//           </button>
//           <button onClick={handleLogout} className="mt-4 underline">Logout</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import { signup, login, logout, forgotPassword, removeBackground } from "./api";
import "./index.css";

function App() {
  const [page, setPage] = useState("login"); // login | signup | forgot | upload
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processed, setProcessed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChangeFile = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setProcessed(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");
    setLoading(true);
    try {
      const url = await removeBackground(file);
      setProcessed(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    const res = await signup(form.name, form.email, form.password);
    alert(res.message || res.error);
    if (!res.error) setPage("login");
  };

  const handleLogin = async () => {
    const res = await login(form.email, form.password);
    alert(res.message || res.error);
    if (!res.error) setPage("upload");
  };

  const handleForgot = async () => {
    const res = await forgotPassword(form.email);
    alert(res.message || res.error);
  };

  const handleLogout = async () => {
    await logout();
    setPage("login");
    setFile(null);
    setPreview(null);
    setProcessed(null);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-900 text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">🪄 Background Remover</h1>

      {(page === "login" || page === "signup" || page === "forgot") && (
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          {page === "signup" && (
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="p-2 rounded bg-gray-800 text-sm sm:text-base md:text-lg"
            />
          )}
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="p-2 rounded bg-gray-800 text-sm sm:text-base md:text-lg"
          />
          {(page === "login" || page === "signup") && (
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="p-2 rounded bg-gray-800 text-sm sm:text-base md:text-lg"
            />
          )}

          {page === "login" && (
            <>
              <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-sm sm:text-base md:text-lg">Login</button>
              <div className="flex justify-between text-xs sm:text-sm md:text-base">
                <button onClick={() => setPage("signup")} className="underline">Signup</button>
                <button onClick={() => setPage("forgot")} className="underline">Forgot?</button>
              </div>
            </>
          )}

          {page === "signup" && (
            <>
              <button onClick={handleSignup} className="bg-green-500 hover:bg-green-600 p-2 rounded text-sm sm:text-base md:text-lg">Signup</button>
              <button onClick={() => setPage("login")} className="underline mt-2 text-xs sm:text-sm md:text-base">Back to Login</button>
            </>
          )}

          {page === "forgot" && (
            <>
              <button onClick={handleForgot} className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded text-sm sm:text-base md:text-lg">Send Reset Link</button>
              <button onClick={() => setPage("login")} className="underline mt-2 text-xs sm:text-sm md:text-base">Back to Login</button>
            </>
          )}
        </div>
      )}

      {page === "upload" && (
        <div className="flex flex-col items-center w-full max-w-4xl px-2 sm:px-4">
          <input type="file" accept="image/*" onChange={handleChangeFile} className="mb-4 sm:mb-6"/>
          {preview && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-4 w-full">
              <div className="flex flex-col items-center">
                <h2 className="mb-2 font-semibold text-base sm:text-lg md:text-xl">Original</h2>
                <img src={preview} alt="preview" className="w-40 sm:w-64 md:w-72 lg:w-80 h-40 sm:h-64 md:h-72 lg:h-80 object-contain border rounded-xl shadow-lg"/>
              </div>
              {processed && (
                <div className="flex flex-col items-center">
                  <h2 className="mb-2 font-semibold text-base sm:text-lg md:text-xl">Processed</h2>
                  <img src={processed} alt="processed" className="w-40 sm:w-64 md:w-72 lg:w-80 h-40 sm:h-64 md:h-72 lg:h-80 object-contain border rounded-xl shadow-lg bg-white"/>
                  <a href={processed} download="bg-removed.png" className="mt-2 block text-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm sm:text-base md:text-lg">Download</a>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm sm:text-base md:text-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Remove Background"}
          </button>
          <button onClick={handleLogout} className="mt-4 underline text-sm sm:text-base md:text-lg">Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
