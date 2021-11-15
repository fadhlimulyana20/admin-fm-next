// BackgroundColor
export const greenBackground = "#E0F9D0"

// Backend API
// export const backendUrl = process.env.NODE_ENV === 'development' ?  'http://localhost:5000' : process.env.API_URL
export const backendUrl = process.env.NODE_ENV === 'development' ?  process.env.NEXT_PUBLIC_BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL
