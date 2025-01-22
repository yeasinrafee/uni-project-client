import { Button, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { TQueryPram, TStudent } from '../../../types';
import { useState } from 'react';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement.api';

export type TTableData = Pick<TStudent, 'fullName' | 'id'>;

export default function StudentData() {
  const [params, setParams] = useState<TQueryPram[] | undefined>(undefined);
  const { data: studentData, isFetching } = useGetAllStudentsQuery(params);

  const tableData = studentData?.data?.map(({ _id, id, fullName }) => ({
    key: _id,
    id,
    fullName,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'action',
      title: 'Action',
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryPram[] = [];
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
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}
