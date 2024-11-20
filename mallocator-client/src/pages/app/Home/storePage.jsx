import BaseLoading from '../../../components/loader/config-loading';
import StoreCard from '../../../components/globals/store-card';

const StorePage = ({ data, loading }) => {


    if (data === null) {
        return <div>No Stores</div>;
    }

    return (
        <BaseLoading loading={loading}>
            <div>
                {data?.length > 0 ? (
                    <div>
                        {data.map((mall, index) => (
                            <div key={index} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                                {mall.stores.map((store) => {
                                    return (
                                        <div className='flex w-full'>
                                            <StoreCard store={store} />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ) : (
                    <label>No malls available</label>
                )}
            </div>
        </BaseLoading>
    );
};

export default StorePage;
