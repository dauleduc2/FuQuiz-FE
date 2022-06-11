import { PricePackage } from '../../../../core/models/pricePackage';

export interface EditPricePackageDTO extends Pick<PricePackage, 'name' | 'originalPrice' | 'salePrice' | 'duration' | 'description' | 'isActive'> {
    subjectId: string;
}

export interface EditPricePackageFormDTO extends Omit<EditPricePackageDTO, 'subjectId'> {}
