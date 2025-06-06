import React from 'react';
import PropTypes from 'prop-types';

import ModularContainer from 'components/layout/ModularContainer';
import ModularImageContainer from 'components/layout/ModularImageContainer';
import TabLabel from 'components/foundations/TabLabel';
import RatingNumeric from 'components/foundations/RatingNumeric';
import HeadingLink from 'components/navigation/HeadingLink';
import ButtonList from 'components/inputs/buttons/ButtonList';
import PromoCode from 'components/inputs/buttons/PromoCode';
import { getCtaUrl } from 'components/pages/pmkt/helpers/util';
import { Typography, Stack, Box, Grid, List, ListItem, ListItemText, Tooltip, Divider, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import CompareCheckbox from 'components/pages/360-reviews/CompareProducts/CompareCheckbox';
import { isEmpty } from 'lodash';

const CustomListItemText = ({ primary, secondary, tooltip }) => {
    return (
        <ListItemText
            primary={<Typography color='text.primary' variant='body1'>{primary}</Typography>}
            secondary={
                <>
                    <Typography color='text.primary' component="span" variant='h4'>{secondary}</Typography>
                    {tooltip && (
                        <Tooltip arrow title={tooltip} placement="top" sx={{ ml: 2, verticalAlign: 'sub' }}>
                            <InfoOutlinedIcon fontSize="small" />
                        </Tooltip>
                    )}
                </>
            }
            sx={{ my: 0 }}
        />
    );
};

CustomListItemText.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tooltip: PropTypes.string,
};

const ProductDetailCard = ({
    card_display_name,
    // removeDisplayNameLink,
    permalink,
    // tracking,
    rating,
    // quick_stats_label,
    // description,
    // reviewLink,
    accolade,
    grid_data,
    // isTied,
    // pros_list,
    // pros_label,
    // cons_list,
    // cons_label,
    // cardData,
    // numberOfRows,
    // expandComponent,
    // handleExpandToggle,
    // popularCard,
    logo,
    // lifestyle_image,
    // product_image,
    coupon,
    // category,
    // comparable,
    // imageWidth,
    // asGrid,
    // schemaData,
    // data_toc_id,
    // data_toc_text,
    product,
    ...props
}) => {
    const theme = useTheme();
    const { blue05, blue30, black90,
        // gray15,
        // gray50,
        // orange80,
        // blue50,
        // green50,
        // black70,
    } = theme.palette.colors;
    // const ctas = getCtaData(product, null, props);
    const couponObject = !isEmpty(product?.coupons) ? product.coupons[0] : coupon;
    const ctaUrl = getCtaUrl(props);
    return (
        <ModularContainer
            elevation={2}
            square={false}
            sx={{
                border: `1px solid ${blue30}`,
                borderRadius: '5px',
            }}
            top={accolade && (
                <Box sx={{ px: { sm: 4, md: 4, lg: 0 }, ml: { sm: 0, lg: 2 } }}>
                    <TabLabel style={{ width: { sm: '100%', md: '100%', lg: 'auto' } }}>{accolade}</TabLabel>
                </Box>
            )}
            contentTop={
                <Grid container sx={{
                    justifyContent: card_display_name ? 'space-between' : 'flex-end',
                    alignItems: 'center',
                    bgcolor: blue05,
                    borderRadius: '4px 4px 0 0',
                    p: '1.25rem 2rem',
                }}>
                    <Grid sm={12} md={12} lg={6}>
                        {card_display_name && permalink && (
                            <HeadingLink
                                variant="h3"
                                href={permalink}
                                mb={2}
                                sx={{ textAlign: { sm: 'center', md: 'center', lg: 'left' } }}
                                linkSx={{ color: black90 }}
                            >
                                {card_display_name}
                            </HeadingLink>
                        )}
                    </Grid>
                    <Grid lg={6} sx={{
                        display: { sm: 'none', md: 'none', lg: 'flex' },
                        justifyContent: 'flex-end',
                    }}>
                        {rating && (
                            <RatingNumeric
                                value={rating}
                                switchAppearance={true}
                                showToolTip={false}
                            />
                        )}
                    </Grid>
                </Grid>
            }
            contentBottom={
                <Divider
                    component="li"
                    variant="middle"
                    sx={{
                        borderColor: blue30,
                        borderBottomWidth: '1px',
                        my: 0,
                        width: '100%',
                    }}
                />
            }
        >
            <Box sx={{ p: 5 }}>
                <Grid container>
                    <Grid sm={12} md={12}
                        sx={{
                            display: { sm: 'flex', md: 'flex', lg: 'none' },
                            justifyContent: 'center',
                        }}
                    >
                        {rating && (
                            <RatingNumeric
                                value={rating}
                                switchAppearance={true}
                                showToolTip={false}
                            />
                        )}
                    </Grid>
                    <Grid sm={12} md={12} lg={'auto'} sx={{ justifyContent: 'center' }}>
                        <ModularImageContainer
                            image={logo?.base_url}
                            isLogo="true"
                            url={ctaUrl}
                            target="_blank"
                            paddingDisable="false"
                        />
                    </Grid>
                    <Grid sm={12} md={12} lg={7} sx={{ mx: 5 }}>
                        <Stack direction={'column'}>
                            <List
                                disablePadding
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: `repeat(${1}, 1fr)`,
                                        sm: `repeat(${2}, 1fr)`,
                                        md: `repeat(${3}, 1fr)`,
                                        lg: `repeat(${3}, 1fr)`,
                                    },
                                    gap: 3,
                                    mb: 4,
                                }}
                            >
                                {grid_data.map((item, index) => (
                                    <ListItem disablePadding key={index} sx={{ maxWidth: '160px', width: 'auto', alignItems: 'flex-start' }}>
                                        <CustomListItemText primary={item?.primary} secondary={item?.secondary} tooltip={item?.tooltip} />
                                    </ListItem>
                                ))}
                            </List>
                            {couponObject && (
                                <PromoCode
                                    cta_url={couponObject.cta_url}
                                    sponsored={couponObject.sponsored}
                                    chiplabel={couponObject.exclusive}
                                    chiplabel_text={couponObject.chiplabel_text}
                                    product_id={product?.id}
                                    border={blue30}
                                    backgroundColor={blue05}
                                    centered={true}
                                >
                                    {couponObject.text}
                                </PromoCode>
                            )}
                            <Typography
                                paragraph
                                sx={{
                                    fontSize: '.75rem',
                                    fontStyle: 'italic',
                                    my: 4,
                                }}
                            >
                                {'*Limited availability. Not all internet speeds may be available in your area. Call to see if you qualify. *Price is after $5/mo autopay & paperless bill'}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid sm={12} md={12} lg={2}>
                        <ButtonList coupon={null} buttons={null} divider={null} disclaimer={'Via Partner Website'} />
                    </Grid>
                    {/* <Grid sm={12} md={12} lg={4}>
                        <ButtonList coupon={coupon} buttons={buttons} divider={false} disclaimer={enableDisclaimer ? disclaimer : ''} />
                    </Grid> */}
                </Grid>
            </Box>
        </ModularContainer>
    );
};

ProductDetailCard.defaultProps = {};

ProductDetailCard.propTypes = {
    accolade: PropTypes.string,
    additional_ctas: PropTypes.array,
    grid_data: PropTypes.array,
    asGrid: PropTypes.bool,
    cardData: PropTypes.array,
    category: PropTypes.string,
    chiplabel_text: PropTypes.string,
    comparable: PropTypes.bool,
    cons_label: PropTypes.string,
    cons_list: PropTypes.array,
    coupon: PropTypes.object,
    coupon_text: PropTypes.string,
    ctaUrl: PropTypes.string,
    data_toc_id: PropTypes.string,
    data_toc_text: PropTypes.string,
    description: PropTypes.string,
    disclaimer_text: PropTypes.string,
    discount_disclaimer: PropTypes.string,
    card_display_name: PropTypes.string,
    expandComponent: PropTypes.bool,
    handleExpandToggle: PropTypes.func,
    imageWidth: PropTypes.string,
    isTied: PropTypes.bool,
    lifestyle_image: PropTypes.object,
    logo: PropTypes.object,
    numberOfRows: PropTypes.number,
    permalink: PropTypes.string,
    phone_number: PropTypes.string,
    popularCard: PropTypes.array,
    primary_cta: PropTypes.object,
    product_image: PropTypes.object,
    product: PropTypes.object,
    pros_label: PropTypes.string,
    pros_list: PropTypes.array,
    quick_stats_label: PropTypes.string,
    rating: PropTypes.string,
    removeDisplayNameLink: PropTypes.bool,
    reviewLink: PropTypes.string,
    schemaData: PropTypes.object,
    secondary_cta: PropTypes.object,
    showRatingTooltip: PropTypes.bool,
    rating_tooltip_title: PropTypes.string,
    rating_tooltip_content: PropTypes.string,
    tracking: PropTypes.object,
    usn_exclusive: PropTypes.bool,
};

export default ProductDetailCard;