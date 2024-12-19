const CityPageBody : React.FC = ()=> {

return (
    <div className = "">
        {
          Array.from({ length: 100 }).map((_, index) => {
            return (<div>
            index: {index}
            </div>);
        })
        }

    </div>
);

}

export default CityPageBody;