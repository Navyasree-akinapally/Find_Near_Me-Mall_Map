import BaseLoading from '../../../components/loader/config-loading';
import StoreCard from '../../../components/globals/store-card';

const NewStoresPage = ({ newStoresData }) => {


    return (
        <BaseLoading loading={false}>
            <div>
                {newStoresData?.length > 0 ? (
                    <div className='grid grid-cols-3 gap-8'>
                        {newStoresData?.map((store, index) => {
                            return (
                                <div key={index} className='relative'>
                                    <StoreCard store={store} />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <>
                        <label htmlFor="">No malls availble</label>
                    </>
                )}
            </div>
        </BaseLoading>
    );
}

export default NewStoresPage;
