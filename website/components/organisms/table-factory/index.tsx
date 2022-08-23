import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Import helpers
import { useSize } from 'lib/hooks';

// Import child components
import { Table, InputFactory } from 'components';

// Import types
import Row from 'lib/types/table-row';
import Cell from 'lib/types/table-cell';

/* Prop Types */
export interface Props {
  /**
   * A custom class to apply to the table
   */
  className?: string;
  /**
   * The data to display in the table header
   */
  header?: string[];
  /**
   * The data to display in the table header
   */
  rows?: Row[];
  /**
   * If JSON data is provided, the table structure will be automatically generated
   */
  jsonData?: JSON[];
  /**
   * Should the table be striped
   * @default false
   */
  striped?: boolean;
  /**
   * Should the table have a solid background colour on the header
   * @default false
   */
  solidHeader?: boolean;
  /**
   * Hide header. There may be times when you want to hide the header.
   */
  hideHeader?: boolean;
  /**
   * Should the table take up the full width of its container
   */
  fullWidth?: boolean;
  /**
   * Should the table headers be title case?
   * @default true
   */
  titleCaseHeaders?: boolean;
  /**
   * Do you want the table to be sortable?
   */
  sortable?: boolean;
  /**
   * Which column number should be sorted by default (zero index)?
   * */
  defaultSortColumn?: number;
  /**
   * Which direction should the table be sorted by default?
   * */
  defaultSortDirection?: 'asc' | 'desc';
  /**
   * Do you want the table to be filterabled
   * @default false
   */
  filterable?: boolean;
  /**
   * Which column number should be filtered by default (zero index)?
   */
  defaultFilterColumn?: number;
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * The `TableFactory` component is a generator, which, when given the appropriate data,
 * will generate a table using the [Table](?path=/docs/molecule-table--default-story)
 * component.
 *
 * This is a much simpler way to generate a table than the `Table` component, which
 * is a very manual process. Unless you require a lot of granualar customisation,
 * the `TableFactory` component is the recommended approach.
 */
export const TableFactory: React.FC<Props> = ({
  className,
  header,
  rows,
  jsonData,
  striped = false,
  titleCaseHeaders = true,
  sortable = false,
  fullWidth = false,
  solidHeader,
  hideHeader = false,
  defaultSortColumn = 0,
  defaultSortDirection,
  filterable = false,
  defaultFilterColumn = 0
}: Props) => {
  const [filter, setFilter] = useState('');
  const [sortDirection, setSortDirection] = useState(
    defaultSortDirection || 'asc'
  );

  const targetRef = useRef<HTMLTableElement>(null);
  const size = useSize(targetRef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  if (!jsonData && !rows) {
    throw new Error('You must provide either jsonData or header and rows');
  }

  if (jsonData) {
    // Look at the first object in the array and extract the keys
    // These will be used to generate the header
    header = Object.keys(jsonData[0]);
    rows = jsonData.map((row) => Object.values(row));
  }

  if (sortable) {
    if (!header) {
      throw new Error(
        'You must provide a header if you want the table to be sortable'
      );
    }
    if (defaultSortDirection) {
      setSortDirection(defaultSortDirection);
    }
    // Sort the rows
    rows =
      rows &&
      rows.sort((a: Row, b: Row) => {
        if (sortDirection === 'asc') {
          return a[defaultSortColumn] > b[defaultSortColumn] ? 1 : -1;
        }
        return a[defaultSortColumn] < b[defaultSortColumn] ? 1 : -1;
      });
  }

  if (filterable) {
    if (!header) {
      throw new Error(
        'You must provide a header if you want the table to be filterable'
      );
    }
    // Filter the rows
    rows =
      rows &&
      rows.filter((row) => {
        const rowString =
          typeof row[defaultFilterColumn] === 'string'
            ? (row[defaultFilterColumn] as string)
            : (row[defaultFilterColumn].toString() as string);
        return rowString.toLowerCase().includes(filter.toLowerCase());
      });
  }

  return (
    <>
      {filterable && header && (
        <InputFactory
          width={size && `${Math.floor(size.width)}px`}
          maxWidth={'40%'}
          labelText={`Filter by ${header[defaultFilterColumn]}`}
          name="table-filter"
          type="text"
          value={filter}
          onChange={handleChange}
        />
      )}
      <Table
        innerRef={targetRef}
        className={className}
        striped={striped}
        solidHeader={solidHeader}
        fullWidth={fullWidth}
      >
        {header && !hideHeader && (
          <Table.Head>
            <Table.Row>
              {header.map((header: string, index: number) => (
                <Table.Cell
                  key={header}
                  th
                  className={
                    sortable && index === defaultSortColumn
                      ? styles['sortable-th']
                      : undefined
                  }
                >
                  <>
                    {titleCaseHeaders ? toTitleCase(header) : header}
                    {sortable && index === defaultSortColumn && (
                      <span
                        className={cx(
                          styles['sort-arrow'],
                          styles[`dir-${sortDirection}`]
                        )}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === 'asc' ? 'desc' : 'asc'
                          );
                        }}
                      />
                    )}
                  </>
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Head>
        )}
        <Table.Body>
          {rows &&
            rows.map((row: Row, index: number) => (
              <Table.Row key={index}>
                {row.map((cell: Cell, index: number) => (
                  <Table.Cell
                    className={
                      sortable && index === defaultSortColumn
                        ? styles['sortable-td']
                        : undefined
                    }
                    key={index}
                    contextHeading={
                      header &&
                      (titleCaseHeaders
                        ? toTitleCase(header[index])
                        : header[index])
                    }
                  >
                    {cell}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
};

TableFactory.displayName = 'TableFactory';

export default TableFactory;
