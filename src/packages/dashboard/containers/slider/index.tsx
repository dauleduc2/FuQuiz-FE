import * as React from 'react';
import Link from 'next/link';
import { routes } from '../../../../core/routes';
import { useRouter } from 'next/router';
import { Slider } from '../../../../core/models/slider';
import { getFilterSlider } from './action';

interface SliderProps {
    currentPage?: number;
    pageSize?: number;
    title?: string;
    userId?: string;
    createAt?: Date;
}
export const SliderList: React.FunctionComponent<SliderProps> = ({ title, currentPage, pageSize, userId, createAt }) => {
    const router = useRouter();

    const [sliders, setSliders] = React.useState<Slider[]>([]);
    const [count, setCount] = React.useState<number>(1);

    const [filterUrl, setFilterUrl] = React.useState<string>('');

    // Default param
    React.useEffect(() => {
        router.push({
            pathname: routes.sliderUrl,
            query: { currentPage, pageSize, title, userId, createAt: '01/01/2022' },
        });
    }, []);

    //  Filter Process
    React.useEffect(() => {
        _fetchData();
    }, [filterUrl]);

    React.useEffect(() => {
        console.log('AS PATH:' + router.asPath);
        setFilterUrl(router.asPath.replace(`${routes.sliderUrl}?`, ''));
    }, []);

    const _fetchData = async () => {
        const filterUrlServer = filterUrl.replace(`currentPage=${Number(currentPage)}`, `currentPage=${Number(currentPage) - 1}`);
        const res = await getFilterSlider(filterUrlServer);
        console.log(res);
        setSliders(res.data);
        setCount(res.count);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Sliders</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the Sliders in home website including their title, backLink, image and isShow.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link href={routes.addSliderUrl} passHref>
                        <p className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                            Add Slider
                        </p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col mt-8">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Image
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Back link
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Showing
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Boolean(count && sliders) &&
                                        sliders.map((slider) => (
                                            <tr key={slider.id}>
                                                <td className="py-4 pl-4 pr-3 whitespace-nowrap sm:pl-6">
                                                    <div className="max-w-sm">
                                                        <img className="w-10 h-10" src={slider.imageUrl} alt="" />
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    <div className="text-gray-900">{slider.title}</div>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    <div className="text-gray-900">{slider.backLink}</div>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
