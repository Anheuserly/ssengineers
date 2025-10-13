export default function ServiceIcons() {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-10">
      <div className="flex justify-center space-x-8 md:space-x-16">
        <div className="text-center text-white">
          <div className="w-12 h-12 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Fire Safety</span>
        </div>
        
        <div className="text-center text-white">
          <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Electrical</span>
        </div>
        
        <div className="text-center text-white">
          <div className="w-12 h-12 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10C21 4 16 2 12 2C8 2 3 4 3 10C3 15 12 22 12 22C12 22 21 15 21 10Z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Plumbing</span>
        </div>
        
        <div className="text-center text-white">
          <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <span className="text-sm font-medium">IBMS</span>
        </div>
      </div>
    </div>
  );
}