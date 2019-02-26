package com.xadhsd.book.server.entity;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xadhsd.dhframe.entity.BaseEntity;

/**
 * 图书实体类
 *
 * @author 刘宏强
 */
@Entity
@Table(name = "book", catalog = "book")

public class Book extends BaseEntity {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /**
     * 图书主键
     */
    private String bookId;

    /**
     * 图书名称
     */
    private String bookName;

    /**
     * 图书标题
     */
    private String bookTitle;

    /**
     * 图书编号
     */
    private String bookNo;

    /**
     * 图书语种
     */
    private String bookLanguage;

    /**
     * 外文名称
     */
    private String foreignName;

    /**
     * 图书作者
     */
    private String bookAuthor;

    /**
     * 作者简介
     */
    private String bookAuthorSummary;

    /**
     * 图书译者
     */
    private String bookTranslator;

    /**
     * 译者简介
     */
    private String bookTranslatorSummary;

    /**
     * 图书目录
     */
    private String bookCatalog;

    /**
     * 内容简介
     */
    private String bookContentSummary;

    /**
     * 产品特色
     */
    private String bookProductFeature;

    /**
     *  编辑推荐
     */
    private String bookEditorRecommend;

    /**
     *  内页插图
     */
    private String bookPageIllustration;

    /**
     *  精彩书评
     */
    private String bookWonderfulReview;

    /**
     *  精彩书摘
     */
    private String bookWonderfulDigest;

    /**
     *  前言序言
     */
    private String bookPreface;

    /**
     * 出版国家
     */
    private String bookPublishCountry;

    /**
     * 出版社
     */
    private String bookPress;

    /**
     * 出版日期
     */
    private Date bookPublishDate;

    /**
     * 图书版次
     */
    private String bookEditionOrder;

    /**
     * 图书页数
     */
    private Integer bookPages;

    /**
     * 图书定价
     */
    private Float bookPrice;

    /**
     * 图书封面
     */
    private String bookCover;

    /**
     * 优先级
     */
    private String bookPriority;

    /**
     * 创建时间
     */
    private Timestamp bookCreateTime;

    /**
     * 修改时间
     */
    private Timestamp bookUpdateTime;

    /**
     * 图书排序
     */
    private Integer bookSort;

    /**
     * 图书状态
     */
    private Boolean bookState;

    /**
     * 推荐图书
     */
    private Set<RefereeBook> refereeBooks = new HashSet<RefereeBook>(0);

    /**
     * 轮播图
     */
    //private Set<Carousel> carousels = new HashSet<Carousel>(0);

    /**
     * 图书分类
     */
    private Set<BookClasses> bookClasseses = new HashSet<BookClasses>(0);

    /**
     * 图书评论
     */
    private Set<BookComment> bookComments = new HashSet<BookComment>(0);

    /**
     * 解读图书
     */
    private Set<UnscrambleBook> unscrambleBooks = new HashSet<UnscrambleBook>(0);

    // Constructors

    /**
     * default constructor
     */
    public Book() {
    }

    /**
     * minimal constructor
     */
    public Book(String bookId) {
        this.bookId = bookId;
    }

    /**
     * full constructor
     */
    public Book(String bookId, String bookName, String bookTitle, String bookNo,
                String bookLanguage, String foreignName, String bookAuthor, String bookAuthorSummary,
                String bookTranslator, String bookTranslatorSummary, String bookCatalog, String bookContentSummary,
                String bookProductFeature, String bookEditorRecommend, String bookPageIllustration,
                String bookWonderfulReview, String bookWonderfulDigest, String bookPreface, String bookPublishCountry, String bookPress, Date bookPublishDate, String bookEditionOrder, Integer bookPages, Float bookPrice,
                Set<RefereeBook> refereeBooks, String bookCover, String bookPriority,
                Timestamp bookCreateTime, Timestamp bookUpdateTime, Integer bookSort, Boolean bookState, Set<BookClasses> bookClasseses, Set<BookComment> bookComments,
                Set<UnscrambleBook> unscrambleBooks) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookTitle = bookTitle;
        this.bookNo = bookNo;
        this.bookLanguage = bookLanguage;
        this.foreignName = foreignName;
        this.bookAuthor = bookAuthor;
        this.bookAuthorSummary = bookAuthorSummary;
        this.bookTranslator = bookTranslator;
        this.bookTranslatorSummary = bookTranslatorSummary;
        this.bookCatalog = bookCatalog;
        this.bookContentSummary = bookContentSummary;
        this.bookProductFeature = bookProductFeature;
        this.bookEditorRecommend = bookEditorRecommend;
        this.bookPageIllustration = bookPageIllustration;
        this.bookWonderfulReview = bookWonderfulReview;
        this.bookWonderfulDigest = bookWonderfulDigest;
        this.bookPreface = bookPreface;
        this.bookPublishCountry = bookPublishCountry;
        this.bookPress = bookPress;
        this.bookPublishDate = bookPublishDate;
        this.bookEditionOrder = bookEditionOrder;
        this.bookPages = bookPages;
        this.bookPrice = bookPrice;
        this.bookCover = bookCover;
        this.bookPriority = bookPriority;
        this.bookCreateTime = bookCreateTime;
        this.bookUpdateTime = bookUpdateTime;
        this.bookSort = bookSort;
        this.bookState = bookState;
        this.refereeBooks = refereeBooks;
        this.bookClasseses = bookClasseses;
        this.bookComments = bookComments;
        this.unscrambleBooks = unscrambleBooks;
    }

    // Property accessors
    @GenericGenerator(name = "generator", strategy = "uuid")
    @Id
    @GeneratedValue(generator = "generator")

    @Column(name = "book_id", unique = true, nullable = false, length = 32)

    public String getBookId() {
        return this.bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    @Column(name = "book_name", length = 100)

    public String getBookName() {
        return this.bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    @Column(name = "book_title", length = 500)

    public String getBookTitle() {
        return this.bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    @Column(name = "book_no", length = 100)

    public String getBookNo() {
        return this.bookNo;
    }

    public void setBookNo(String bookNo) {
        this.bookNo = bookNo;
    }

    @Column(name = "book_language", length = 100)

    public String getBookLanguage() {
        return this.bookLanguage;
    }

    public void setBookLanguage(String bookLanguage) {
        this.bookLanguage = bookLanguage;
    }

    @Column(name = "foreign_name", length = 100)

    public String getForeignName() {
        return this.foreignName;
    }

    public void setForeignName(String foreignName) {
        this.foreignName = foreignName;
    }

    @Column(name = "book_author", length = 50)

    public String getBookAuthor() {
        return this.bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    @Column(name = "book_author_summary", length = 500)

    public String getBookAuthorSummary() {
        return this.bookAuthorSummary;
    }

    public void setBookAuthorSummary(String bookAuthorSummary) {
        this.bookAuthorSummary = bookAuthorSummary;
    }

    @Column(name = "book_translator", length = 50)

    public String getBookTranslator() {
        return this.bookTranslator;
    }

    public void setBookTranslator(String bookTranslator) {
        this.bookTranslator = bookTranslator;
    }

    @Column(name = "book_translator_summary", length = 500)

    public String getBookTranslatorSummary() {
        return this.bookTranslatorSummary;
    }

    public void setBookTranslatorSummary(String bookTranslatorSummary) {
        this.bookTranslatorSummary = bookTranslatorSummary;
    }

    @Column(name = "book_catalog", length = 1000)

    public String getBookCatalog() {
        return this.bookCatalog;
    }

    public void setBookCatalog(String bookCatalog) {
        this.bookCatalog = bookCatalog;
    }

    @Column(name = "book_content_summary", length = 1000)

    public String getBookContentSummary() {
        return this.bookContentSummary;
    }

    public void setBookContentSummary(String bookContentSummary) {
        this.bookContentSummary = bookContentSummary;
    }

    @Column(name = "book_product_feature", length = 32)

    public String getBookProductFeature() {
        return this.bookProductFeature;
    }

    public void setBookProductFeature(String bookProductFeature) {
        this.bookProductFeature = bookProductFeature;
    }

    @Column(name = "book_editor_recommend", length = 65535)

    public String getBookEditorRecommend() {
        return this.bookEditorRecommend;
    }

    public void setBookEditorRecommend(String bookEditorRecommend) {
        this.bookEditorRecommend = bookEditorRecommend;
    }

    @Column(name = "book_page_illustration", length = 500)

    public String getBookPageIllustration() {
        return this.bookPageIllustration;
    }

    public void setBookPageIllustration(String bookPageIllustration) {
        this.bookPageIllustration = bookPageIllustration;
    }

    @Column(name = "book_wonderful_review", length = 65535)

    public String getBookWonderfulReview() {
        return this.bookWonderfulReview;
    }

    public void setBookWonderfulReview(String bookWonderfulReview) {
        this.bookWonderfulReview = bookWonderfulReview;
    }

    @Column(name = "book_wonderful_digest", length = 65535)

    public String getBookWonderfulDigest() {
        return this.bookWonderfulDigest;
    }

    public void setBookWonderfulDigest(String bookWonderfulDigest) {
        this.bookWonderfulDigest = bookWonderfulDigest;
    }

    @Column(name = "book_preface", length = 65535)

    public String getBookPreface() {
        return this.bookPreface;
    }

    public void setBookPreface(String bookPreface) {
        this.bookPreface = bookPreface;
    }

    @Column(name = "book_publish_country", length = 50)

    public String getBookPublishCountry() {
        return this.bookPublishCountry;
    }

    public void setBookPublishCountry(String bookPublishCountry) {
        this.bookPublishCountry = bookPublishCountry;
    }

    @Column(name = "book_press", length = 50)

    public String getBookPress() {
        return this.bookPress;
    }

    public void setBookPress(String bookPress) {
        this.bookPress = bookPress;
    }

    @Temporal(TemporalType.DATE)
    @Column(name = "book_publish_date", length = 10)

    public Date getBookPublishDate() {
        return this.bookPublishDate;
    }

    public void setBookPublishDate(Date bookPublishDate) {
        this.bookPublishDate = bookPublishDate;
    }

    @Column(name = "book_edition_order", length = 100)

    public String getBookEditionOrder() {
        return this.bookEditionOrder;
    }

    public void setBookEditionOrder(String bookEditionOrder) {
        this.bookEditionOrder = bookEditionOrder;
    }

    @Column(name = "book_pages")

    public Integer getBookPages() {
        return this.bookPages;
    }

    public void setBookPages(Integer bookPages) {
        this.bookPages = bookPages;
    }

    @Column(name = "book_price", precision = 12, scale = 0)

    public Float getBookPrice() {
        return this.bookPrice;
    }

    public void setBookPrice(Float bookPrice) {
        this.bookPrice = bookPrice;
    }

    @Column(name = "book_cover", length = 32)

    public String getBookCover() {
        return this.bookCover;
    }

    public void setBookCover(String bookCover) {
        this.bookCover = bookCover;
    }

    @Column(name = "book_priority", length = 10)

    public String getBookPriority() {
        return this.bookPriority;
    }

    public void setBookPriority(String bookPriority) {
        this.bookPriority = bookPriority;
    }

    @Column(name = "book_create_time", length = 19)

    public Timestamp getBookCreateTime() {
        return this.bookCreateTime;
    }

    public void setBookCreateTime(Timestamp bookCreateTime) {
        this.bookCreateTime = bookCreateTime;
    }

    @Column(name = "book_update_time", length = 19)

    public Timestamp getBookUpdateTime() {
        return this.bookUpdateTime;
    }

    public void setBookUpdateTime(Timestamp bookUpdateTime) {
        this.bookUpdateTime = bookUpdateTime;
    }

    @Column(name = "book_sort")

    public Integer getBookSort() {
        return this.bookSort;
    }

    public void setBookSort(Integer bookSort) {
        this.bookSort = bookSort;
    }

    @Column(name = "book_state")

    public Boolean getBookState() {
        return this.bookState;
    }

    public void setBookState(Boolean bookState) {
        this.bookState = bookState;
    }

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "book", orphanRemoval = true)
    public Set<RefereeBook> getRefereeBooks() {
        return this.refereeBooks;
    }

    public void setRefereeBooks(Set<RefereeBook> refereeBooks) {
        this.refereeBooks = refereeBooks;
    }

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "book", orphanRemoval = true)

    public Set<BookClasses> getBookClasseses() {
        return this.bookClasseses;
    }

    public void setBookClasseses(Set<BookClasses> bookClasseses) {
        this.bookClasseses = bookClasseses;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "book")

    public Set<BookComment> getBookComments() {
        return this.bookComments;
    }

    public void setBookComments(Set<BookComment> bookComments) {
        this.bookComments = bookComments;
    }

    @JsonIgnore 
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "book", orphanRemoval = true)

    public Set<UnscrambleBook> getUnscrambleBooks() {
        return this.unscrambleBooks;
    }

    public void setUnscrambleBooks(Set<UnscrambleBook> unscrambleBooks) {
        this.unscrambleBooks = unscrambleBooks;
    }

}