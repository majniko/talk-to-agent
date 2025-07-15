import { AppRootState } from '@redux/store';
import { EqualityFn } from 'react-redux';
import { useAppSelector } from '@redux/hooks';

export const createUseSliceSelector = <
  SliceData extends Record<PropertyKey, any>,
>(
  selectSlice: (state: AppRootState) => SliceData,
) => {
  function useSelector<
    Key extends keyof SliceData,
    Selected extends SliceData[Key],
  >(select: Key, equalityFnOrOptions?: EqualityFn<Selected>): Selected;
  function useSelector<Selected>(
    select: (data: SliceData) => Selected,
    equalityFnOrOptions?: EqualityFn<Selected>,
  ): Selected;
  function useSelector<Key extends keyof SliceData, Selected>(
    select: Key | ((data: SliceData) => Selected),
    equalityFnOrOptions?: EqualityFn<Selected>,
  ): any {
    return useAppSelector((data) => {
      const slice = selectSlice(data);
      if (typeof select === 'function') return select(slice);
      return slice[select];
    }, equalityFnOrOptions);
  }

  return useSelector;
};
