import { Button, Dropdown, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { TSemester } from '../../../types';
// import { useState } from 'react';
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from '../../../redux/features/admin/courseManagement.api';
import moment from 'moment';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export type TTableData = Pick<TSemester, 'startDate' | 'endDate' | 'status'>;

const items = [
  {
    label: 'Upcoming',
    key: 'UPCOMING',
  },
  {
    label: 'Ongoing',
    key: 'ONGOING',
  },
  {
    label: 'Ended',
    key: 'ENDED',
  },
];

export default function RegisteredSemester() {
  // const [params, setParams] = useState<TQueryPram[] | undefined>(undefined);
  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();

  const [semesterId, setSemesterId] = useState('');

  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format('DD/MM/YYYY'),
      endDate: moment(new Date(endDate)).format('DD/MM/YYYY'),
      status,
    })
  );

  const handleStatusUpdate: SubmitHandler<FieldValues> = (data) => {
    const updatedData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    updateRegisteredSemester(updatedData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (item) => {
        let color;
        if (item === 'UPCOMING') {
          color = 'blue';
        }
        if (item === 'ONGOING') {
          color = 'green';
        }
        if (item === 'ENDED') {
          color = 'red';
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      key: 'startDate',
      title: 'Start Date',
      dataIndex: 'startDate',
    },
    {
      key: 'endDate',
      title: 'End Date',
      dataIndex: 'endDate',
    },
    {
      key: 'action',
      title: 'Action',
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
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
