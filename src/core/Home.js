import React  , {useState ,useEffect}from 'react';
import '../styles.css';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import getProducts from './helper/coreapicalls';


const Home = () =>{

    const [products , setProducts] = useState([]);

    const [error , setError] = useState(false);
    //create a method to load all products

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setProducts(data)
            }
        })
    }

    useEffect (() => {
        loadAllProducts()
    } , []);


    return (
        <Base title="Home Page" description="welcome to wildlife">
            <div className="row text-center">
                <h1 className="text-white">All Products</h1>
                <div className="row ">
                    {products.map((product , index)=>{
                        return (
                            <div key={index} className="col col-lg-3 col-md-6 col-sm-8 col-xs-6 mb-4">
                                <Card product ={product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )

};


export default Home;
