import React from 'react'
import AttributesButton from './AttributesButton';
import { PTagStyle } from './StyledComponents/StyledProductInfoComponents.styles';

const AttributesOptions = ({attributes, handleClick, stateAttributes, location}) => {
    return (
        <>
            {attributes.map((attribute, i) =>
                <div key={i} >
                    <PTagStyle attribute={true} location={location}>{attribute.name}:</PTagStyle> 
                    <div className="ProductInfo_AttributesButtons"   >
                        { 
                            attribute.items.map((item, itemIndex) => 
                            <AttributesButton 
                                stateAttributes={stateAttributes}
                                key={itemIndex} 
                                handleClick={handleClick} 
                                attributeName= {attribute.name}
                                attributeType= {attribute.type}
                                displayValue={item.displayValue}
                                location={location}
                        />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default AttributesOptions

