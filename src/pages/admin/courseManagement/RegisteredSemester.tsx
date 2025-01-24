import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { TAcademicSemester } from '../../../types';
// import { useState } from 'react';
import { useGetAllRegisteredSemesterQuery } from '../../../redux/features/admin/courseManagement.api';

export type TTableData = Pick<
  TAcademicSemester,
  'name' | 'startMonth' | 'endMonth'
>;

export default function RegisteredSemester() {
  // const [params, setParams] = useState<TQueryPram[] | undefined>(undefined);

  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate,
      endDate,
      status,
    })
  );

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
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
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
