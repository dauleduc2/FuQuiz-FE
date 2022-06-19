import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { allFieldData } from '../../../../core/common/dataField';
import { FormWrapper, SelectField, TextField } from '../../../../core/components/form';
import { Table, TableDescription, TableHead, TableRow } from '../../../../core/components/table';
import { TableBody } from '../../../../core/components/table/tableBody';
import { PricePackage } from '../../../../core/models/pricePackage';
import { routes } from '../../../../core/routes';
import { dataParser } from '../../../../core/util/data';
import { PaginationBar } from '../../../dashboard';
import { useGetPricePackageListById } from '../../../package/common/hooks/useGetPricePackageListBySubjectId';
import { useGetLessonList } from '../../common/hooks/useGetLessonList';
import { updateLessonActivation } from './action';
import { UpdateLessonActivationDTO } from './interface';

interface LessonListProps {
    subjectId: string;
}

export const LessonList: React.FunctionComponent<LessonListProps> = ({ subjectId }) => {
    const methods = useForm();
    const router = useRouter();

    const { lessonList } = useGetLessonList(subjectId);
    const { pricePackageList } = useGetPricePackageListById(subjectId);
    const _handleOnSubmit = async () => {};
    const _onUpdateLessonActivation = async (lessonId: string, data: UpdateLessonActivationDTO) => {
        const res = await updateLessonActivation(lessonId, data);
        if (res) {
            toast.success('Update success!');
        }
    };
    return (
        <div className="px-4 space-y-4 sm:px-6 lg:px-4">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Subject Lessons</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all lesson of subject including their title, lesson type, date and activation.
                    </p>
                </div>
                <div className="flex flex-col items-end mt-4 space-y-2 sm:mt-0 sm:ml-16">
                    <div className="space-x-2">
                        <Link href={router.asPath.replace(routes.adminLessonListUrl, routes.adminEditSubjectUrl)} passHref>
                            <p className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                Overview
                            </p>
                        </Link>
                    </div>

                    <Link href={router.asPath + routes.adminAddLessonUrl} passHref>
                        <p className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                            Add Lesson
                        </p>
                    </Link>
                </div>
            </div>
            <div>
                <FormWrapper methods={methods}>
                    <form className="space-y-4" onSubmit={methods.handleSubmit(_handleOnSubmit)}>
                        <div className="flex space-x-4">
                            <TextField name="title" label="Title" isRequire={false} />
                            <SelectField
                                label="Lesson Type"
                                values={[
                                    { label: 'Subject Topic', value: 'domain' },
                                    { label: 'Lesson', value: 'domain 1' },
                                    { label: 'Quiz', value: 'domain 2' },
                                ]}
                                name="isActive"
                                isRequire={false}
                            />
                            <TextField name="createdAt" label="Create From" type={'date'} isRequire={false} />
                            <TextField name="updateAt" label="Update date" type={'date'} isRequire={false} />
                            <SelectField
                                label="Active"
                                values={[
                                    { label: 'Active', value: true },
                                    { label: 'Inactive', value: false },
                                ]}
                                name="isActive"
                                isRequire={false}
                            />
                            <SelectField
                                label="Package"
                                values={[allFieldData, ...((pricePackageList && dataParser<PricePackage>(pricePackageList, 'name', 'id')) || [])]}
                                name="isActive"
                                isRequire={false}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </FormWrapper>
            </div>
            <div className="flex flex-col mt-8">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <Table>
                                <TableHead fields={['Title', 'Lesson Type', 'Create at', 'Update date', 'Activation', '']} />
                                <TableBody>
                                    {lessonList.map((lesson) => (
                                        <TableRow key={lesson.id}>
                                            <TableDescription>
                                                <div className="text-gray-900">{lesson.name}</div>
                                            </TableDescription>

                                            <TableDescription>
                                                <div className="max-w-sm">
                                                    <div className="text-gray-900">{lesson.type.description}</div>
                                                </div>
                                            </TableDescription>
                                            <TableDescription>
                                                <div className="text-gray-900">{new Date(lesson.createdAt).toLocaleString()}</div>
                                            </TableDescription>
                                            <TableDescription>
                                                <div className="text-gray-900">{new Date(lesson.updatedAt).toLocaleString()}</div>
                                            </TableDescription>
                                            <TableDescription>
                                                {lesson.isActive ? (
                                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        Inactive
                                                    </span>
                                                )}
                                            </TableDescription>
                                            <TableDescription>
                                                <Link href={`${router.asPath}${routes.adminEditLessonUrl}/${lesson.id}`} passHref>
                                                    <p className="text-indigo-600 cursor-pointer hover:text-indigo-900">Edit</p>
                                                </Link>

                                                <p
                                                    onClick={() => _onUpdateLessonActivation(lesson.id, { isActive: !lesson.isActive })}
                                                    className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                                                >
                                                    {lesson.isActive ? 'Deactive' : 'Active'}
                                                </p>
                                            </TableDescription>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <PaginationBar currentPage={Number(1)} numberOfItem={4} pageSize={Number(12)} routeUrl={router.asPath} />
        </div>
    );
};
