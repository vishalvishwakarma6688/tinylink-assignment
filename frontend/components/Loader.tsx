export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
}
