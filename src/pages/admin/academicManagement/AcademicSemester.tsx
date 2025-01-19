import { useGetAcademicSemesterQuery } from '../../../redux/features/admin/academicManagement.api';

import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { TAcademicSemester } from '../../../types';
import { useState } from 'react';

export type TTableData = Pick<
  TAcademicSemester,
  '_id' | 'name' | 'startMonth' | 'endMonth'
>;

export default function AcademicSemester() {
  const [params, setParams] = useState([]);
  const { data: semesterData } = useGetAcademicSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn',
        },
        {
          text: 'Fall',
          value: 'Fall',
        },
        {
          text: 'Summer',
          value: 'Summer',
        },
      ],
    },
    {
      key: 'year',
      title: 'Year',
      dataIndex: 'year',
      filters: [
        {
          text: '2025',
          value: '2025',
        },
        {
          text: '2026',
          value: '2026',
        },
        {
          text: '2027',
          value: '2027',
        },
        {
          text: '2028',
          value: '2028',
        },
        {
          text: '2029',
          value: '2029',
        },
        {
          text: '2030',
          value: '2030',
        },
      ],
    },
    {
      key: 'startMonth',
      title: 'Start Month',
      dataIndex: 'startMonth',
    },
    {
      key: 'endMonth',
      title: 'End Month',
      dataIndex: 'endMonth',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const queryParams = [];
    if (extra.action === 'filter') {
      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );
    }
    setParams(queryParams);
  };

  return (
    <Table<TTableData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}
