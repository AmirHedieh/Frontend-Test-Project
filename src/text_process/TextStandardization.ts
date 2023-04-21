export class TextStandardization {
    public static transformNumbers = (text: string) => {
        return text
            .replace(/[\u0660-\u0669]/g, (c) => {
                return `${c.charCodeAt(0) - 0x0660}`
            }).replace(/[\u06f0-\u06f9]/g, (c) => {
                return `${c.charCodeAt(0) - 0x06f0}`
            })
    }
    public static transformArabic = (text: string) => {
        const concat1 = '[\u0600-\u0621|\u0623-\u0626|\u0629|\u064a-\u067d|\u067f-\u0685'
        const concat2 = '|\u0687-\u0697|\u0699-\u06ae|\u06b0-\u076d|\ufb50-\ufbe9]'
        return text.replace(new RegExp(concat1 + concat2, 'g'), (c) => {
            switch (c.charCodeAt(0)) {
                case 1571:
                case 1573:
                case 1649:
                case 1650:
                case 1651:
                case 1652:
                case 1653:
                    return 'ا'
                case 1574:
                case 1610:
                case 1656:
                case 1740:
                case 1741:
                case 1742:
                case 1744:
                case 1745:
                case 1746:
                case 1747:
                    return 'ی'
                case 1572:
                case 1654:
                case 1655:
                case 1743:
                case 1732:
                case 1733:
                case 1734:
                case 1735:
                case 1736:
                case 1737:
                case 1738:
                case 1739:
                    return 'و'
                case 1577:
                case 1657:
                case 1658:
                case 1660:
                case 1661:
                case 1663:
                case 1731:
                    return 'ت'
                case 1646:
                case 1659:
                case 1664:
                    return 'ب'
                case 1647:
                    return 'ق'
                case 1665:
                case 1666:
                case 1669:
                    return 'ح'
                case 1667:
                case 1668:
                    return 'ج'
                case 1672:
                case 1673:
                case 1674:
                case 1675:
                case 1676:
                case 1677:
                case 1678:
                case 1679:
                case 1680:
                    return 'د'
                case 1681:
                case 1682:
                case 1683:
                case 1684:
                case 1685:
                case 1686:
                case 1687:
                case 1689:
                    return 'ر'
                case 1690:
                case 1691:
                case 1692:
                    return 'س'
                case 1693:
                case 1694:
                    return 'ص'
                case 1695:
                    return 'ط'
                case 1696:
                    return 'ع'
                case 1697:
                case 1698:
                case 1699:
                case 1700:
                case 1701:
                case 1702:
                    return 'ف'
                case 1703:
                case 1704:
                    return 'ق'
                case 1705:
                case 1706:
                case 1707:
                case 1708:
                case 1709:
                case 1710:
                    return 'ک'
                case 1712:
                case 1713:
                case 1714:
                case 1715:
                case 1716:
                    return 'گ'
                case 1717:
                case 1718:
                case 1719:
                case 1720:
                    return 'ل'
                case 1721:
                case 1722:
                case 1723:
                case 1724:
                case 1725:
                    return 'ن'
                case 1749:
                case 1726:
                    return 'ه'
                case 1671:
                case 1727:
                    return 'چ'
                case 1728:
                case 1729:
                case 1730:
                    return 'ه'
                default:
                    return ''
            }
        })
    }
}
