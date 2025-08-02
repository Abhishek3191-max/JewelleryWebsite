import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../components/pages/LoginPage'
import SignUpPage from '../components/pages/signup'
import HomePage from '../components/pages/homePage'
import DynamicProductListingPage from '../components/pages/jewelleryProductPage'
import ProfileDashboard from '../components/pages/profile'
import ProductPage from '../components/pages/productDetailsPage'
import ShoppingCart from '../components/pages/cart'
import CheckoutHeader from '../components/pages/checkout'



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {

                path: "/sign-up",
                element: <SignUpPage />

            },
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "/products/:category",
                element: <DynamicProductListingPage/>
            },
            {
                path: "/myaccount/profile",
                element: <ProfileDashboard/>
            },
            {
                path: "/productdetails",
                element: <ProductPage/>
            },
            {
                path: "/shopping-cart",
                element:<ShoppingCart/>
            },
            {
                path:"/checkout",
                element:<CheckoutHeader/>
            }
           
           
        ]
    }
])

export default router