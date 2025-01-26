import { Button, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { TSemester } from '../../../types';
// import { useState } from 'react';
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement.api';

import { useState } from 'react';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import UniForm from '../../../components/form/UniForm';
import UniSelect from '../../../components/form/UniSelect';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export type TTableData = Pick<TSemester, 'startDate' | 'endDate' | 'status'>;

export default function Courses() {
  // const [params, setParams] = useState<TQueryPram[] | undefined>(undefined);

  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courseData?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}-${code}`,
  }));

  // const handleStatusUpdate: SubmitHandler<FieldValues> = (data) => {
  //   const updatedData = {
  //     id: semesterId,
  //     data: {
  //       status: data.key,
  //     },
  //   };

  //   updateRegisteredSemester(updatedData);
  // };

  const columns: TableColumnsType<TTableData> = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      showSorterTooltip: { target: 'full-header' },
    },
    {
      key: 'code',
      title: 'Code',
      dataIndex: 'code',
    },
    {
      key: 'action',
      title: 'Action',
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   const queryParams: TQueryPram[] = [];
  //   if (extra.action === 'filter') {
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: 'name', value: item })
  //     );

  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: 'year', value: item })
  //     );
  //   }
  //   setParams(queryParams);
  // };

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [assignFaculties] = useAssignFacultiesMutation();

  const facultyOptions = facultiesData?.data?.map((item) => ({
    value: item?._id,
    label: item?.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    const res = await assignFaculties(facultyData);
    console.log(res);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UniForm onSubmit={handleSubmit}>
          <UniSelect
            mode='multiple'
            options={facultyOptions}
            name='faculties'
            label='Faculties'
          />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Modal>
    </>
  );
};
